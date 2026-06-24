export default async function handler(req, res) {

  const { q } = req.query;

  const API_KEY = process.env.GNEWS_API_KEY;

  if (!q) {
    return res.status(400).json({
      error: "検索キーワードが必要です"
    });
  }

  const url =
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=ja&country=jp&max=20&apikey=${API_KEY}`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    const keywords =
      q.toLowerCase()
       .split(/\s+/)
       .filter(Boolean);

    const filteredArticles =
      (data.articles || [])

      .map(article => {

        const text = (
          (article.title || "") +
          " " +
          (article.description || "")
        ).toLowerCase();

        let score = 0;

        keywords.forEach(keyword => {

          if (
            article.title
              ?.toLowerCase()
              .includes(keyword)
          ) {
            score += 10;
          }

          if (
            article.description
              ?.toLowerCase()
              .includes(keyword)
          ) {
            score += 3;
          }

        });

        return {
          ...article,
          score
        };

      })

      .filter(article => article.score > 0)

      .sort((a, b) => b.score - a.score)

      .slice(0, 9);

    return res.status(200).json({
      articles: filteredArticles
    });

  } catch (error) {

    return res.status(500).json({
      error: "ニュース取得失敗"
    });

  }

}