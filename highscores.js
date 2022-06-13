// Declared variables here
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Clear scores with event listener
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Gets scores from localStorage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i <allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
// go back to Javascript Quiz page
goBack.addEventListener("click", function () {
    window.location.replace("index.html");
});