const $ = function (selector) { return document.querySelector(selector); };
const countryNames = []
let questionNumber = 0
let score = 0


const getData = function () {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        //get every country name into an array
        .then(json => {
            json.forEach(country => {
                countryNames.push(country.name.official)
            });
            console.log(countryNames)
            randomCountry()
            $("#validation").innerHTML = ""
        })
        .catch(error => console.error(error));

}

const randomCountry = function () {
    //generate a random country
    const randomIndex = Math.floor(Math.random() * countryNames.length)
    console.log(countryNames[randomIndex])
    getCountry(countryNames[randomIndex])
}


const getCountry = function (chosenFlag) {
    //get the random countries' info
    fetch(`https://restcountries.com/v3.1/name/${chosenFlag}`)
        .then(response => response.json())
        .then(json => {
            buildPage(json)
        })
        .catch(error => console.log(error));
}

const buildPage = function (country) {
    let htmlStr = "<img id='flag' src='" + country[0].flags.png + "'>" + "<br><input type='text' id='ans'><br><button id='next' disabled>Next</button><button id='check' >Check</button>"
    $("#data").innerHTML = htmlStr

    //user get five plays
    if (questionNumber == 5) {
        done()
    }
    else {
        $("#check").addEventListener("click", function () {
            let answer = $("#ans").value
            //user can only click to the next ques when answer is checked
            $("#next").disabled = false
            checkAnswer(answer, country[0].name.official, country[0].name.common)

        })
        $("#next").addEventListener("click", function () {
            //increase ques number every play
            questionNumber++
            getData()
        })
    }

    console.log(questionNumber)
}

const checkAnswer = function (answer, officialName, commonName) {
    //user can enter common or official name in lower case
    if ((answer.toLowerCase() == officialName.toLowerCase()) || (answer.toLowerCase() == commonName.toLowerCase())) {
        score += 1
        $("#validation").innerHTML = "correct"
    }
    else {
        $("#validation").innerHTML = officialName
    }
    //user can only click check button once per play
    $("#check").disabled = true

}

const done = function () {
    //reset everything

    let htmlStr = "<h1 id='score'>" + score + "</h1><br><button id='again'>Play again</button>"
    $("#data").innerHTML = htmlStr
    $("#again").addEventListener("click", function () {
        getData()
        this.style.display = "none"

    })
    questionNumber = 0
    score = 0
}

window.addEventListener("load", () => {
    $("#start").addEventListener("click", function () {
        getData()
        this.style.display = "none"
    })
})




