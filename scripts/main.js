// Api call
async function fetchData(date) {
    const url =
        "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=London&minDate=" +
        date +
        "&maxDate=" +
        date;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "fdc4447b6amsh4f6d92330bf9b70p10d629jsn382d7f08a2f0",
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
    // clear table
    let tableRows = document.querySelectorAll("#concerts tr");

    tableRows.forEach((row) => {
        row.remove();
    });

    // Remove loading
    document.getElementById("loading").innerHTML = "";

    // Map json to table rows
    let concertHTMLResults = results.data
        .map(
            (item) =>
                `<tr class='concertTRow'>
                  <td class='concertName'>${item.name}</td>
                  <td class='concertLocation'>${item.location.name}</td>
                  <td class='concertDate'>${item.endDate}</td>
                </tr>`
        )
        .join("");

    document
        .getElementById("concerts")
        .insertAdjacentHTML("beforeend", concertHTMLResults);
}

function init(date) {
    // Api call
    fetchData(date.format("YYYY-M-D"));

    // Set text on date input
    $("#reportrange span").html(date.format("MMMM D, YYYY"));
}

(() => {
    init(moment());

    $("#reportrange").daterangepicker(
        {
            singleDatePicker: true,
            showDropdowns: true,
            minYear: moment().year(),
            maxYear: parseInt(moment().add(1, "years").format("YYYY"), 10),
        },
        function (start) {
            fetchData(start.format("YYYY-M-D"));
        }
    );
})();
