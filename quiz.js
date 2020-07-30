///checking 

console.log("loaded")


// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
    
        choiceA : "happy toad marries leopard",
        choiceB : "Hypertext Markup Language",
        choiceC : "hyper turkey means laughs",
        correct : "B"
    },{
        question : "What does CSS stand for?",
       
        choiceA : "Cascading Style Sheets",
        choiceB : "Charlie smith sanderson",
        choiceC : "candy store special",
        correct : "A"
    },{
        question : "What does JS stand for?",
     
        choiceA : "john smith",
        choiceB : "joan smith",
        choiceC : "Java Script",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 15;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    //qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    
    if(count >0){
        count--
    }else{
        count = 15;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score+=count;
        // change progress color to green
        answerIsCorrect();
        count = 15;
        if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();

    }
    else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
    }
    else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
        count -= 5;
    }
    
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    //const scorePerCent = Math.round(100 * score/questions.length);



    // scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ score +"</p>";
}