//////////////////////////////
// 都市変換
//////////////////////////////

const cityMap = {

  // 北海道・東北
  "北海道":"Sapporo",
  "札幌":"Sapporo",

  "青森":"Aomori",
  "青森県":"Aomori",
  "青森市":"Aomori",

  "岩手":"Morioka",
  "岩手県":"Morioka",
  "盛岡":"Morioka",

  "宮城":"Sendai",
  "宮城県":"Sendai",
  "仙台":"Sendai",

  "秋田":"Akita",
  "秋田県":"Akita",
  "秋田市":"Akita",

  "山形":"Yamagata",
  "山形県":"Yamagata",
  "山形市":"Yamagata",

  "福島":"Fukushima",
  "福島県":"Fukushima",
  "福島市":"Fukushima",

  // 関東
  "茨城":"Mito",
  "茨城県":"Mito",
  "水戸":"Mito",

  "栃木":"Utsunomiya",
  "栃木県":"Utsunomiya",
  "宇都宮":"Utsunomiya",

  "群馬":"Maebashi",
  "群馬県":"Maebashi",
  "前橋":"Maebashi",

  "埼玉":"Saitama",
  "埼玉県":"Saitama",
  "さいたま":"Saitama",

  "千葉":"Chiba",
  "千葉県":"Chiba",
  "千葉市":"Chiba",

  "東京":"Tokyo",
  "東京都":"Tokyo",

  "神奈川":"Yokohama",
  "神奈川県":"Yokohama",
  "横浜":"Yokohama",

  // 中部
  "新潟":"Niigata",
  "新潟県":"Niigata",
  "新潟市":"Niigata",

  "富山":"Toyama",
  "富山県":"Toyama",
  "富山市":"Toyama",

  "石川":"Kanazawa",
  "石川県":"Kanazawa",
  "金沢":"Kanazawa",

  "福井":"Fukui",
  "福井県":"Fukui",
  "福井市":"Fukui",

  "山梨":"Kofu",
  "山梨県":"Kofu",
  "甲府":"Kofu",

  "長野":"Nagano",
  "長野県":"Nagano",
  "長野市":"Nagano",

  "岐阜":"Gifu",
  "岐阜県":"Gifu",
  "岐阜市":"Gifu",

  "静岡":"Shizuoka",
  "静岡県":"Shizuoka",
  "静岡市":"Shizuoka",

  "愛知":"Nagoya",
  "愛知県":"Nagoya",
  "名古屋":"Nagoya",

  // 近畿
  "三重":"Tsu",
  "三重県":"Tsu",
  "津":"Tsu",

  "滋賀":"Otsu",
  "滋賀県":"Otsu",
  "大津":"Otsu",

  "京都":"Kyoto",
  "京都府":"Kyoto",

  "大阪":"Osaka",
  "大阪府":"Osaka",

  "兵庫":"Kobe",
  "兵庫県":"Kobe",
  "神戸":"Kobe",

  "奈良":"Nara",
  "奈良県":"Nara",

  "和歌山":"Wakayama",
  "和歌山県":"Wakayama",

  // 中国
  "鳥取":"Tottori",
  "鳥取県":"Tottori",

  "島根":"Matsue",
  "島根県":"Matsue",
  "松江":"Matsue",

  "岡山":"Okayama",
  "岡山県":"Okayama",

  "広島":"Hiroshima",
  "広島県":"Hiroshima",

  "山口":"Yamaguchi",
  "山口県":"Yamaguchi",

  // 四国
  "徳島":"Tokushima",
  "徳島県":"Tokushima",

  "香川":"Takamatsu",
  "香川県":"Takamatsu",
  "高松":"Takamatsu",

  "愛媛":"Matsuyama",
  "愛媛県":"Matsuyama",
  "松山":"Matsuyama",

  "高知":"Kochi",
  "高知県":"Kochi",

  // 九州・沖縄
  "福岡":"Fukuoka",
  "福岡県":"Fukuoka",

  "佐賀":"Saga",
  "佐賀県":"Saga",

  "長崎":"Nagasaki",
  "長崎県":"Nagasaki",

  "熊本":"Kumamoto",
  "熊本県":"Kumamoto",

  "大分":"Oita",
  "大分県":"Oita",

  "宮崎":"Miyazaki",
  "宮崎県":"Miyazaki",

  "鹿児島":"Kagoshima",
  "鹿児島県":"Kagoshima",

  "沖縄":"Naha",
  "沖縄県":"Naha",
  "那覇":"Naha"
};
//////////////////////////////
// 時計
//////////////////////////////

function updateClock(){

  const now = new Date();

  document
    .getElementById("clock")
    .innerText =
      now.toLocaleString("ja-JP");
}

setInterval(updateClock,1000);

updateClock();

//////////////////////////////
// ダークモード
//////////////////////////////

function toggleDarkMode(){

  document.body
    .classList
    .toggle("dark");
}

//////////////////////////////
// 天気取得
//////////////////////////////

function getWeather(city){

const url =
`/api/weather?city=${encodeURIComponent(city)}`;

  fetch(url)

    .then(res => res.json())

    .then(data => {

      const weather =
        document.getElementById("weather-container");

      weather.innerHTML = `

        <h2>${data.name}</h2>

        <div class="weather-temp">
          ${Math.round(data.main.temp)}℃
        </div>

        <p>
          ${data.weather[0].description}
        </p>

        <p>
          湿度: ${data.main.humidity}%
        </p>

      `;
    });
}

//////////////////////////////
// 現在地取得
//////////////////////////////

function getCurrentLocation(){

  navigator.geolocation.getCurrentPosition(

    pos => {

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url =
`/api/weather?lat=${lat}&lon=${lon}`;

      fetch(url)

        .then(res => res.json())

        .then(data => {

          const weather =
            document.getElementById("weather-container");

          weather.innerHTML = `

            <h2>${data.name}</h2>

            <div class="weather-temp">
              ${Math.round(data.main.temp)}℃
            </div>

            <p>
              ${data.weather[0].description}
            </p>

            <p>
              湿度: ${data.main.humidity}%
            </p>

          `;
        });

      loadNews("technology");
    }
  );
}

//////////////////////////////
// 天気検索
//////////////////////////////

function searchCity(){

  let city =
    document
      .getElementById("city-input")
      .value
      .trim();

  if(!city) return;

  city = cityMap[city] || city;

  getWeather(city);
}

//////////////////////////////
// Enter検索
//////////////////////////////

document
  .getElementById("city-input")
  .addEventListener("keydown",e=>{

    if(e.key==="Enter"){
      searchCity();
    }
});

document
  .getElementById("news-input")
  .addEventListener("keydown",e=>{

    if(e.key==="Enter"){
      searchNews();
    }
});

//////////////////////////////
// ニュース取得
//////////////////////////////

function loadNews(keyword){

  const container =
    document.getElementById("news-container");

  container.innerHTML =
    `<div class="loading">読み込み中...</div>`;

  const url =
`/api/news?q=${encodeURIComponent(keyword)}`;

  fetch(url)

    .then(res => res.json())

    .then(data => {

      container.innerHTML = "";

      if(!data.articles || data.articles.length === 0){

        container.innerHTML =
          `<div class="loading">ニュースが見つかりません</div>`;

        return;
      }

      data.articles.forEach(article => {

        const card =
          document.createElement("div");

        card.className =
          "news-card glass";

        card.innerHTML = `

          ${
            article.image
            ? `<img src="${article.image}" alt="ニュース画像">`
            : ""
          }

          <div class="news-content">

            <h2>
              ${article.title}
            </h2>

            <p>
              ${article.description || ""}
            </p>

            <a
              href="${article.url}"
              target="_blank">

              記事を見る →

            </a>

          </div>

        `;

        container.appendChild(card);

      });

    })

    .catch(error => {

      console.error(error);

      container.innerHTML =
        `<div class="loading">ニュース取得失敗</div>`;

    });

}

//////////////////////////////
// ニュース検索
//////////////////////////////

function searchNews(){

  const keyword =
    document
      .getElementById("news-input")
      .value
      .trim();

  if(keyword){
    loadNews(keyword);
  }
}

//////////////////////////////
// 初期表示
//////////////////////////////

getCurrentLocation();

