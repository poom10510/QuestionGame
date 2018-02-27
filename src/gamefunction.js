//npm i -g live-server
// live-server

var timestart = false;
var timemax = 100;
var timeleft = timemax;
var qcontainer = [];
// Update the count down every 1 second
var counttime = setInterval(function() {
    if (timeleft <= 0) {
        //clearInterval(x);
        changeQuestion();
        updateQuestion();
        //document.getElementById("demo").innerHTML = "EXPIRED";
    }
    if (timestart) {
        document.getElementById("timer").innerHTML = "Time: " + (timeleft / 10).toFixed(1);
        timeleft--;
    }
}, 100); //second 1000 milli 100

var qindex = -1;
var qused = [];
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
    qused = [];
    updateScore();
    document.getElementById("questionshow").textContent = "Question: " + questionnow;

}

function summaryGame() {
    $("#questionboard").hide();
    $("#summaryboard").toggle();
    console.log(answerrecord);
    var timetotal = 0,
        correctanwer = 0,
        incorrectanswer = 0;

    answerrecord.forEach(item => {
        //{ "answer": num, "key": key, "time": 10 - timeleft }
        timetotal += item.time / 10;
        if (item.answer == item.key) {
            correctanwer++;
        } else {
            incorrectanswer++;
        }
    });
    var avt = (timetotal / questionlimit).toFixed(2);
    console.log("tt" + avt);

    $("#sum1").text("Totalscore: " + scorenow);
    $("#sum2").text("Correct: " + correctanwer);
    $("#sum3").text("Incorrect: " + incorrectanswer);
    $("#sum4").text("Totaltime: " + timetotal.toFixed(2) + " Second");
    $("#sum5").text("Averagetime: " + (timetotal / questionlimit).toFixed(2) + " Second / Question");

}


function changeStatetime() {
    console.log(1);
    timestart = !timestart;
}

function getquestion() {
    changeQuestion();
    //scorenow++;
    updateScore()
}


function changeQuestion() {
    var x = Math.floor((Math.random() * qcontainer.length));
    while (qused[x]) {
        x = Math.floor((Math.random() * qcontainer.length));
    }
    var q = qcontainer[x].question;

    console.log(x + " " + q);
    setQuestion(qcontainer[x]);
    timeleft = timemax;
    qindex = x;
    qused[x] = true;

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
        answerrecord.push({ "answer": num, "key": key, "time": timemax - timeleft });
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