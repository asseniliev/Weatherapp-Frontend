const backendUrl = 'https://weatherapp-backend-phi.vercel.app';
//const backendUrl = 'http://localhost:3000';


fetch(`${backendUrl}/weather`)
	.then(response => response.json())
	.then(data => {
		if (data.weather) {
			//console.log(data.weather);
			for (let i = 0; i < data.weather.length; i++) {
				document.querySelector('#cityList').innerHTML += `
				<div class="cityContainer">
				<p class="name">${data.weather[i].cityWeather.cityName}</p>
				<p class="description">${data.weather[i].cityWeather.description}</p>
				<img class="weatherIcon" src="images/${data.weather[i].cityWeather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather[i].cityWeather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather[i].cityWeather.tempMax
					}°C</p >
				</div >
				<button class="deleteCity" id="${data.weather[i].cityWeather.cityName}">Delete</button>
			</div >
				`;
			}
			updateDeleteCityEventListener();
		}
	});

function updateDeleteCityEventListener() {
	for (let i = 0; i < document.querySelectorAll('.deleteCity').length; i++) {
		document.querySelectorAll('.deleteCity')[i].addEventListener('click', function () {
			fetch(`${backendUrl}/weather/${this.id} `, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

document.querySelector('#addCity').addEventListener('click', function () {
	const cityName = document.querySelector('#cityNameInput').value;
	fetch(`${backendUrl}/weather`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName }),
	}).then(response => response.json())
		.then(data => {
			if (data.result) {
				document.querySelector('#cityList').innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.cityWeather.cityName}</p>
				<p class="description">${data.cityWeather.description}</p>
				<img class="weatherIcon" src="images/${data.cityWeather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.cityWeather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.cityWeather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.cityWeather.cityName}">Delete</button>
			</div>
					`;
				updateDeleteCityEventListener();
				document.querySelector('#cityNameInput').value = '';
			}

		});
});