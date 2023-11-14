async function fetchData() {
    const url =
        "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=London&minDate=2023-11-13&maxDate=2023-11-16&page=1";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        displayConcerts(result);
    } catch (error) {
        console.error(error);
    }
}

function displayConcerts(results) {
    document.getElementById("concerts").innerHTML = results.data
        .map((item) => `<li>${item.name}</li>`)
        .join("");
}

fetchData();
