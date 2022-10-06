
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const imgs = Array.from(document.querySelectorAll(".choice-prefix"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector(".progressBarFull");
const timeCount = document.querySelector("#tempoText");
const gifWin = document.querySelector(".gif");
const gifSrc = document.querySelector(".giphy-embed");
const choicesDisplay = document.querySelectorAll(".choice-container");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "\"El vecino, es el que el vecino elige para alcalde\"",
        choice1: 'M.Rajoy',
        img1: 'Rajoy',
        choice2: 'Darth Vader',
        img2: 'Vader',
        answer: 1,
    },
    {
        question: "\"El vecino, es el que el vecino elige para alcalde\"",
        choice1: 'M.Rajoy',
        img1: 'Rajoy',
        choice2: 'Darth Vader',
        img2: 'Vader',
        answer: 2,
    },
    {
        question: "\"El vecino, es el que el vecino elige para alcalde\"",
        choice1: 'Niko Bellic',
        img1: 'Vader',
        choice2: 'paco',
        img2: 'Rajoy',
        answer: 1,
    },
    {
        question: "\"El vecino, es el que el vecino elige para alcalde\"",
        choice1: 'Niko Bellic',
        img1: 'Vader',
        choice2: 'Alex de la Iglesia',
        img2: 'Rajoy',
        answer: 1,
    }
];


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    
}

function timer(){
    let count = 120000;
    var interval = setInterval(function(){
    var minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((count % (1000 * 60)) / 1000);
    timeCount.innerHTML = minutes + "m " + seconds + "s ";
    count=count-1000;
    
        if (count === 0){
            clearInterval(interval);
            timeCount.innerHTML= "Boom!";
            setTimeout(() => {
                getNewQuestion();
            }, 5000);
        }
    }, 1000);

}

timer();
getNewQuestion = () => {
        
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem("mostRecentScore", score);
            //go to the end page
            let time = setTimeout(function(){}
            , 2000);
            return window.location.assign('./end.html');
        }
        
        questionCounter++;
        progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;
        
        imgs.forEach(img => {
            const numImg = img.dataset["number"];
            document.getElementById("img1").src = `./img/${currentQuestion.img1}.jpg`;
            document.getElementById("img2").src = `./img/${currentQuestion.img2}.jpg`;
        });

        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });
        
        availableQuestions.splice(questionIndex, 1);
        
        acceptingAnswers = true;
           
}


    


choices.forEach(choice => {
    
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
    
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
        selectedChoice.parentElement.classList.add(classToApply);
        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
            mostrarGifWin();
           
        }else{
            mostrarGifLose();
            
        }
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            
        }, 5000);
        
    });   
});



function mostrarGifWin(){
    
    var cadGifWin = "https://giphy.com/embed/a0h7sAqON67nO";
    gifSrc.src = cadGifWin;
    gifWin.style.display = "block";
    
    let timer = setTimeout(function(){
        gifWin.style.display = "none";
    }, 5000);
    
}

function mostrarGifLose(){
    
    var cadGifLose = "https://giphy.com/embed/3o7TKr3nzbh5WgCFxe"
    gifSrc.src = cadGifLose;
    gifWin.style.display = "block";

    let time = setTimeout(function(){
        gifWin.style.display = "none";
    }, 5000);
    

}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();