// Api call
async function fetchData(minDate, maxDate) {
    const url =
        "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=London&minDate=" +
        minDate +
        "&maxDate=" +
        maxDate;

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
        console.log(result);
        displayConcerts(result);
    } catch (error) {
        console.error(error);
    }
}

function displayConcerts(results) {
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

(() => {
    // Initialize date range picker
    var end = moment().add(7, "days");
    var start = moment();

    function cb(start, end) {
        // Api call
        fetchData(start.format("YYYY-M-D"), end.format("YYYY-M-D"));

        // const event = new Date("05 October 2011 14:48 UTC");

        $("#reportrange span").html(
            start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
        );
    }

    $("#reportrange").daterangepicker(
        {
            startDate: start,
            endDate: end,
            ranges: {
                Today: [moment(), moment()],
                Tomorrow: [moment(), moment().add(1, "days")],
                "Next 7 Days": [moment(), moment().add(6, "days")],
                "Next 30 Days": [moment(), moment().add(29, "days")],
                "Next 60 Days": [moment(), moment().add(59, "days")],
            },
        },
        cb
    );

    cb(start, end);
})();
