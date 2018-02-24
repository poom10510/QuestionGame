//npm i -g live-server
// live-server

var timestart = false;
var timemax = 10;
var timeleft = timemax;
var qcontainer = [];
// Update the count down every 1 second
var counttime = setInterval(function() {
    if (timeleft <= 0) {
        //clearInterval(x);
        changeQuestion();
        //document.getElementById("demo").innerHTML = "EXPIRED";
    }
    if (timestart) {
        document.getElementById("timer").innerHTML = "Time: " + timeleft;
        timeleft--;
    }
}, 1000);

var qindex = -1;
var scorenow = 0;
var questionnow = 1;
var questionlimit = 5;
var answerrecord = [];

function game(data) {
    console.log('game should be start with ', data)
    qcontainer = data;
    changeQuestion();
}

function startGame() {
    resetGame();
    changeStatetime();
}

function resetGame() {
    scorenow = 0;
    questionnow = 1;
    timeleft = timemax;
    answerrecord = [];
    updateScore();
    document.getElementById("questionshow").textContent = "Question: " + questionnow;

}

function summaryGame() {
    $("#questionboard").hide();
    $("#summaryboard").toggle();
    console.log(answerrecord);

}


function changeStatetime() {
    console.log(1);
    timestart = !timestart;
}

function getquestion() {
    qindex = changeQuestion();
    //scorenow++;
    updateScore()
}


function changeQuestion() {
    var x = Math.floor((Math.random() * qcontainer.length));
    while (qindex == x) {
        x = Math.floor((Math.random() * qcontainer.length));
    }
    var q = qcontainer[x].question;

    console.log(x + " " + q);
    setQuestion(qcontainer[x]);
    timeleft = timemax;
    qindex = x;

}

function updateScore() {
    document.getElementById("scoreshow").textContent = "Score: " + scorenow;
}

function updateQuestion() {
    console.log(questionnow);
    if (questionlimit - questionnow > 0) {
        questionnow++;
        document.getElementById("questionshow").textContent = "Question: " + questionnow;
    } else {
        changeStatetime();
        summaryGame();

    }

}

function setQuestion(item) {
    document.getElementById("question").textContent = item.question;
    document.getElementById("c1").textContent = item.choice[0];
    document.getElementById("c2").textContent = item.choice[1];
    document.getElementById("c3").textContent = item.choice[2];
    document.getElementById("c4").textContent = item.choice[3];
}

function setQuestionvalue(num) {
    questionlimit = num;
    document.getElementById("startselect").textContent = "Start " + questionlimit + " Questions";

}

function selectAnswer(num) {
    if (timestart) {
        var key = qcontainer[qindex].answer;
        answerrecord.push({ "answer": num, "key": key, "time": 10 - timeleft });
        if (num == key) {
            console.log(num + " correct!");
            scorenow++;
        } else {
            console.log(num + " incorrect!");
        }

        changeQuestion();
        updateScore();
        updateQuestion();
    }
}