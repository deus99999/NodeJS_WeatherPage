function getWeather() {
  const selectedCity = document.getElementById("citySelect").value;
  const searchCity = document.getElementById("searchInput").value.trim();
  const city = searchCity || selectedCity;

  fetch('/api/city', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ city })
  })
  .then(res => {
    if (!res.ok) throw new Error("Місто не знайдено");
    return res.json();
  })
  .then(data => {
    console.log(data)
    showWeather(data);
    showForecast(data.forecast.forecastday);
    changeBackground(data.current.condition.text);
  })
  .catch(err => {
    document.getElementById("weather").innerHTML = `<p>${err.message}</p>`;
    document.getElementById("forecast").innerHTML = "";
  });
}

    
function showWeather(data) {
      const weatherBox = document.getElementById("weather");
      weatherBox.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>Температура:</strong> ${data.current.temp_c} ℃</p>
        <p><strong>Хмарність:</strong> ${data.current.cloud}%</p>
        <p><strong>Вітер:</strong> ${data.current.wind_kph} км/год</p>
        <p><strong>${data.current.condition.text}</p></strong>
        <img src="${data.current.condition.icon}" alt="icon">
      `;
}

    function changeBackground(condition) {
      const body = document.body;
      condition = condition.toLowerCase();
      console.log(condition)
      if (condition.includes("sun") || condition.includes("ясно")) {
        body.style.backgroundImage = "url('https://ichef.bbci.co.uk/ace/standard/1200/cpsprodpb/DF3D/production/_113094175_1200-a-gettyimages-485290142.jpg')";
        body.style.backgroundSize = "cover";
        // body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

      } 
      else if (condition.includes("cloud") || condition.includes("хмарність")) {
        body.style.backgroundImage = "url('https://novadoba.com.ua/wp-content/uploads/2020/08/lanah-nel-e0P5fkUTRFg-unsplash-scaled.jpg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

      } 
      else if (condition.includes("rain") || condition.includes("дощ") || condition.includes("мряка")) {
        body.style.backgroundImage = "url('https://thelivenagpur.com/wp-content/uploads/2025/03/ai-generated-beautiful-rain-day-view-photo.jpg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
      
      } 
      else if (condition.includes("злива")) {
        body.style.backgroundImage = "url('https://mukachevo.net/uploads/media/images/image/91/d1/91d1f978ed9f4ee79e2d3c605cbd6fb9bhmlhzqphxbqqfg_image.jpg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
      }
      else {
        body.style.background = "linear-gradient(to top, #607d8b, #90a4ae)";
      }
    }

function showForecast(days) {
  console.log("forcast")
  const forecastBox = document.getElementById("forecast");
  forecastBox.innerHTML = "";

  days.forEach(day => {
    const date = day.date;
    const condition = day.day.condition.text;
    const icon = day.day.condition.icon;
    const temp = day.day.avgtemp_c;
    const html = `
      <div class="forecast-day">
        <p><strong>${date}</strong></p>
        <img src="${icon}" alt="icon">
        <p>${condition}</p>
        <p>Середня температура: ${temp}℃</p>
      </div>
    `;
    forecastBox.innerHTML += html;
  });
}