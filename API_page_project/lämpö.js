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

        const temperature = Math.round(item.temperature)

        const dateColumn = document.createElement("td");
        dateColumn.className = "date-column";
        dateColumn.innerHTML = newTime;
        row.appendChild(dateColumn);

        const valueColumn = document.createElement("td");
        valueColumn.className = "value-column";
        valueColumn.innerHTML = temperature + '°C';
        row.appendChild(valueColumn)

        table.appendChild(row)

    })
    const chart = Chart.getChart("tempChart");
    if(chart != undefined) {
        chart.destroy();
    }

    new Chart("tempChart", {
        type: "bar",
        data: {
            datasets: [{
                label: "Lämpötila (°C)",
                data: data,
                backgroundColor: "#0B3EF4"
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'date_time',
                yAxisKey: 'temperature',
                key: 'temperature'
            },
            plugins: {
                legend: {display: true},
                title: {
                    display: true,
                    text: "Lämpötila kaavio"
                }
            }
        }
    });
}

    const fetchCollectors = async (value) => {

        try {
            const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/' + value);
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
