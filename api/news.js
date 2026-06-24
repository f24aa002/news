export default async function handler(req, res) {

  const { q } = req.query;

  const API_KEY = process.env.NEWS_API_KEY;

  if (!q) {
    return res.status(400).json({
      error: "検索キーワードが必要です"
    });
  }

  const url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=ja&pageSize=9&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      error: "ニュース取得失敗"
    });

  }

}