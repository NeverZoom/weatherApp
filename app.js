window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let locationIcon = document.querySelector('.weather-icon');
	const temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = `https://cors-anywhere.herokuapp.com/`;
			const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&lang=ru&appid=7a5f89690d236203076eaad7827333af`;
		
			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const { temp } = data.main;
				const { description, icon } = data.weather[0];
				const { name } = data;

				// Set DOM elements from API
				temperatureDegree.textContent = temp;
				temperatureDescription.textContent = description;
				locationTimezone.textContent = name;
				locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png">`;

				let celsius = (temp - 32) * (5 / 9);

				temperatureSection.addEventListener('click', ()=> {
					if(temperatureSpan.textContent === "F") {
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celsius);
					} else {
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temp;
					}
				});
			});
		
		});
	} else {
		h1.textContent = "Хэй, это не будет работать без разрешение на показ геопозиции для браузера";
	}

});