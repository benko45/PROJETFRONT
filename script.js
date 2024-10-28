/**
 * 
 * @param { function} callback
 * @returns {int}  
 */
function calculateScore(callback) {
    const correctAnwers = {
        q1: "Paris",
        q2: "Vénus",
        q3: "Jupiter",
    }

    const form = document.getElementById('quizz-form');
    let score = 0;

    for(const q in correctAnwers) {
        if(form[q].value === correctAnwers[q]) {
            score++;
        }
    }
    callback(score)
}

function displayResult(score, callback) {
    const correctAnwers = {
        q1: "Paris",
        q2: "Vénus",
        q3: "Jupiter",
    }
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Votre score est de ${score} / ${Object.keys(correctAnwers).length}`;
    callback(score)
}

/**
 * 
 * @param { int} score 
 */
function handleMessage(score){
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove("excellent", "good", "ok", "tryAgain");
    if(score === 3) {
        resultDiv.innerHTML += "<br>🎉🎉🎉";
        resultDiv.classList.add("excellent")
    }else if(score === 2) {
        resultDiv.innerHTML += "<br>🎉🎉";
        resultDiv.classList.add("good")
    } else if(score === 1) {
        resultDiv.innerHTML += "<br>🎉";
        resultDiv.classList.add("ok")
    } else {
        resultDiv.innerHTML += "<br>😭";
        resultDiv.classList.add("tryAgain")
    }
}

// formes possibles de la fonction submitQuizz//

// function submitQuizz()  {
//     calculateScore(function(score){
//         displayResult(score, function(){
//             handleMessage(score);})
//         });

// }

// function submitQuizz() {
//     calculateScore(function(score){
//         displayResult(score, handleMessage)
//     });
// }

// function submitQuizz() {
//     calculateScore(function(score){
//         displayResult(score);
//         handleMessage(score);
//     })
// }

function submitQuizz() {
    calculateScore((score) =>
        displayResult(score, () => handleMessage(score))
    );
}





function checkAuth() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if(!isAuthenticated) {
        alert("Vous n'êtes pas connecté");
        window.location.href = "login.html";
    } else {
        alert("Vous êtes connecté");
    }
}

/**
 * Affiche le menu utilisateur stocké dans le local storage
 * @param {* text} username 
 */
function showUserMenu(username){
    const userNameToDisplay = document.getElementById("username-display");
    userNameToDisplay.innerHTML = username;
}

// document.addEventListener('DOMContentLoaded', () => {
//     const storedUsername = localStorage.getItem("username");
//     if(storedUsername) {
//         showUserMenu(storedUsername);
//     } else {
//         window.location.href = "login.html";
//     }
// });

const logoutButton = document.getElementById("logout-button")
if(logoutButton){
logoutButton.addEventListener("click", () => {
    localStorage.setItem("isAuthenticated", false);
    window.location.href = "login.html";
    })
}

let currentQuestionIndex = 0;
let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")   
        // const response = await fetch("./questions.json");
        const questions = await response.json();
        console.log(questions);
    } catch (error) {
        console.error("Erreur lors du chargement des questions" + error);
    }

}