// var with array and object for quiz questions
var questions = [
    {
        title: "Commonly used data types DO Not include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed with _____. ",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parantheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },
        
];

// Declaring variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// 15 seconds per person makes up seconds left
var secondsLeft = 75;

// interval time
var holdInterval = 0;

// penalty time
var penalty = 10;

// creates new element
var ulCreate = docuent.createElement("ul");

// starts timer on button and shows countdown on screen
timer.addEventListener("click", function() {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time is up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to webpage:
function render(questionIndex) {
        // clear the existing data
        questionsDiv.innerHTML = "";
        ulCreate.innerHTML = "";
        // for loops for info in array
        for (var i = 0; i < questions.length; i++) {
            var userQuestion = questions[questionIndex].title;
            var userChoices = questions[questionIndex].choices;
            questionsDiv.textContent = userQuestion;
        }
        // New for question choices
        userChoices.forEach(function (newItem) {
            var listItem = document.createElement("li");
            listItem.textContent = newItem;
            questionsDiv.appendChild(ulCreate);
            ulCreate.appendChild(listItem);
            listItem.addEventListener("click", (compare));
        })
    }
     // Function to compare choices with answer
    function compare(event) {
        var element = event.target;

        if (element.matches("li")) {

            var createDiv = document.createElement("div");
            createDiv.setAttribute("id", "createDiv");
            // Correct
            if (element.textContent == questions[questionIndex].answer) {
                score++;
                createDiv.textContent = "Correct! This is the answer: " + questions[questionIndex].answer;

            } else {
                // -5 seconds deducted from secondsLeft when answered incorrectly
                secondsLeft = secondsLeft - penalty;
                createDiv.textContent = "Wrong! This is the answer: " + questions[questionIndex].answer;
            }

        }
        // question index shows what number question you are on
        questionIndex++;

        if (questionIndex >= questions.length) {
            // All done append last page with the users score
            allDone();
            createDiv.textContent = "End of the quiz!" + "" + "You scored " + score + "/" + questions.length + "Correct!";
        } else {
            render(questionIndex);
        }
        questionsDiv.appendChild(createDiv);

    }
// All done to append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All done!"

    questionsDiv.appendChild(createH1);

    //Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Time remaining to be replaced with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score: " + timeRemaining;

        questionsDiv.appendChild(createInput);
    }

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "Submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent + "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener for localStorage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Goes to high scores page
            window.location.replace("./Highscores.html");
        }
    });

}



