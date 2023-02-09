
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

        const value = Math.round(item.data)


        const datePart = document.createElement("td");
        datePart.className = "date-part";
        datePart.innerHTML = newTime;
        row.appendChild(datePart);

        const valuePart = document.createElement("td");
        valuePart.className = "value-part";
        valuePart.innerHTML = item.data.humidity_out || item.data.humidity_in || item.data.rain || item.data.wind_speed || item.data.wind_direction || item.data.temperature || item.data.light || item.data.DS1820_temp_1 || item.data.DHT11_hum_1 || item.data.DHT11__temp_1 || item.data.BMP_temp_1 || item.data.Air_pres_1 || item.data.Windspeed1;
        row.appendChild(valuePart)


        table.appendChild(row)

    })
}

    fetchDatalist = async () => {

        try {
            const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50/');
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const jsonData = await response.json()

            populateTable(jsonData)


        } catch (error) {
            console.error(error)
        }
    }
    fetchDatalist()
