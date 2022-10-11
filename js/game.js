
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
        question: "\"Toqué a Messi para asegurarme de que es un ser humano\"",
        choice1: 'G. Buffon',
        img1: 'Buffon',
        choice2: 'Karius',
        img2: 'Karius',
        answer: 1,
    },
    {
        question: "\"Dije que bajaría los impuestos y los estoy subiendo\"",
        choice1: 'M.Rajoy',
        img1: 'Rajoy',
        choice2: 'Darth Vader',
        img2: 'Vader',
        answer: 1,
    },
    {
        question: "\"El fútbol no es un juego, es magia\"",
        choice1: 'Pep Guardiola',
        img1: 'Guardiola',
        choice2: 'D. Beckham',
        img2: 'Beckham',
        answer: 2,
    },
    {
        question: "\"De mí se han dicho auténticas barbaridades: Han dicho que tengo sida, que soy catalán...\"",
        choice1: 'Toni Cantó',
        img1: 'Canto',
        choice2: 'Camilo Sesto',
        img2: 'Sesto',
        answer: 2,
    },

    {
        question: "\"¿No crees que si estuviera equivocado lo sabría?\"",
        choice1: 'Sheldon Cooper',
        img1: 'Sheldon',
        choice2: 'Perez Reverte',
        img2: 'Reverte',
        answer: 1,
    },

    {
        question: "\"Yo lo convertiré en legal\"",
        choice1: 'Palpatine',
        img1: 'Palpatine',
        choice2: 'Diaz Ayuso',
        img2: 'Ayuso',
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
    var arrSuccessGif = {
        0: "./img/success-1.gif",
        1: "./img/success-2.gif",
        2: "./img/success-3.gif",
        3: "./img/success-4.gif",
        4: "./img/success-5.gif",
    }

    var  numIndex = Math.floor(Math.random() * 4);
    var cadGifWin = "" + arrSuccessGif[numIndex];

    gifSrc.src = cadGifWin;
    gifWin.style.display = "block";
    
    let timer = setTimeout(function(){
        gifWin.style.display = "none";
    }, 5000);
    
}

function mostrarGifLose(){
    
    var arrFailGif = {
        0: "./img/loser-1.gif",
        1: "./img/loser-2.gif",
        2: "./img/loser-3.gif",
        3: "./img/loser-4.gif",
    }

    var  numIndex = Math.floor(Math.random() * 3);
    var cadGifLose = "" + arrFailGif[numIndex];

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