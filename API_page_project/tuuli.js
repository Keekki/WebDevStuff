'use strict;'

$(document).ready(function() {
    $(window).scroll(function() {
        if(this.scrollY > 20) {
            $('.navbar').addClass("sticky")
        }
        else {
            $('.navbar').removeClass("sticky")
        }
    })
});


const populateTable = (data) => {

    const table = document.getElementById("collectors")

    data.map(item => {
        const row = document.createElement("tr");

        const time = new Date(item.date_time)

        const newTime = time.toLocaleString('fi-Fi')
        time.toLocaleString('fi-Fi')

        const windspeed = Math.round(item.wind_speed)


        const dateColumn = document.createElement("td");
        dateColumn.className = "date-column";
        dateColumn.innerHTML = newTime;
        row.appendChild(dateColumn);

        const valueColumn = document.createElement("td");
        valueColumn.className = "value-column";
        valueColumn.innerHTML = windspeed + 'm/s';
        row.appendChild(valueColumn)

        table.appendChild(row)

    })
    const chart = Chart.getChart("tuuliChart");
    if(chart != undefined) {
        chart.destroy();
    }

    new Chart("tuuliChart", {
        type: "bar",
        data: {
            datasets: [{
                label: "Tuulen nopeus (m/s)",
                data: data,
                backgroundColor: "#0B3EF4"
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'date_time',
                yAxisKey: 'wind_speed',
                key: 'wind_speed'
            },
            plugins: {
                legend: {display: true},
                title: {
                    display: true,
                    text: "Tuulen nopeus kaavio"
                }
            }
        }
    });
}

    const fetchCollectors = async (value) => {

        try {
            const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/' + value);
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const jsonData = await response.json()

            populateTable(jsonData)


        } catch (error) {
            console.error(error)
        }
    }

    function update() {
    var select = document.getElementById('timeSpanselector');
    var value = select.options[select.selectedIndex].value;

    fetchCollectors(value)

}
update();

