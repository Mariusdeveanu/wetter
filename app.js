async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    if (!city) {
        weatherInfo.innerHTML = 'Bitte geben Sie eine Stadt ein.';
        return;
    }

    try {
        const response = await fetch(`http://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
        }
        const data = await response.json();

        const temperature = data.current_condition[0].temp_C;
        const description = data.current_condition[0].weatherDesc[0].value;
        const location = data.nearest_area[0].areaName[0].value;

        weatherInfo.innerHTML = `
            <p>Ort: ${location}</p>
            <p>Temperatur: ${temperature}°C</p>
            <p>Wetterbeschreibung: ${description}</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = 'Fehler: Stadt nicht gefunden oder Netzwerkproblem.';
    }
}
