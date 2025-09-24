const $ = function (selector) { return document.querySelector(selector); };


const getData = function () {
    const input = $("#country").value
    console.log(country)

    fetch(`https://restcountries.com/v3.1/all`)
        .then(response => response.json())
        .then(json => {
            //user can enter either common name or official name
            const country = json.find(c =>
                c.name.common.toLowerCase() == input.toLowerCase() || c.name.official.toLowerCase() == input.toLowerCase())

            if (country) {
                buildPage(country)
            }
            else {
                // Alert the user if country does not exist
                alert("Country not found")

            }
        })
        .catch(error => console.log(error));
}

const buildPage = function (country) {
    let htmlStr = ""
    let currencies = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    let languages = Object.values(country.languages).join(', ')

    htmlStr = "<div id='info'>" +
        "<img id='flag' src='" + country.flags.png + "'>" +
        "<div id='details'>" +
        "<div class='details'>Official Name:</div> " + country.name.official +
        " <div class='details'>Region:</div> " + country.region +
        " <div class='details'>Capital:</div> " + country.capital +
        " <div class='details'>Population:</div> " + " " + country.population +
        " <div class='details'>Continent:</div> " + country.continents +
        " <div class='details'>Timezone:</div> " + country.timezones +
        " <div class='details'>Currency:</div> " + currencies +
        " <div class='details'>Languages:</div> " + languages +
        "</div>" +
        "</div>"

    $("#data").innerHTML = htmlStr
}

const filter = function () {
    const region = $("#region").value
    console.log(region)

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(json => {
            buildRegion(json)
        })
}

const buildRegion = function (region) {
    let htmlStr = "<div id='filterDisplay'>"
    //excess the region array and get all the countries in the region
    for (const i in region) {
        console.log(i + 1)
        htmlStr += "<p><b>" + (parseInt(i) + 1) + "</b>   " + region[i].name.common + "<img id='regionflag' src='" + region[i].flags.png + "'>" + "</p>"
    }
    htmlStr += "</div>"
    $("#data").innerHTML = htmlStr
}


window.addEventListener("load", () => {
    $("#search").addEventListener("click", getData)
    $("#filter").addEventListener("click", filter)
    $("#country").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault()
            $("#search").click()
        }
    })
})




