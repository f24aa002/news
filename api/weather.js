export default async function handler(req, res) {

  const { city, lat, lon } = req.query;

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  let url = "";

  if (lat && lon) {
    url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=ja&units=metric`;
  } else if (city) {
    url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},JP&appid=${API_KEY}&lang=ja&units=metric`;
  } else {
    return res.status(400).json({
      error: "city または lat/lon が必要です"
    });
  }

  try {

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      error: "天気取得失敗"
    });

  }

}