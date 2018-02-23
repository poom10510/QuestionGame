//npm i -g live-server
// live-server

var timestart = false;
var timeleft = 10;

var qcontainer = [];
// Update the count down every 1 second
var counttime = setInterval(function() {
    if (timeleft <= 0) {
        //clearInterval(x);
        changeQuestion()
            //document.getElementById("demo").innerHTML = "EXPIRED";
    }
    if (timestart) {
        document.getElementById("timer").innerHTML = timeleft;
        timeleft--;
    }
}, 1000);

var qindex = -1;
var score = 0;

function game(data) {
    console.log('game should be start with ', data)
    qcontainer = data;
    qindex = changeQuestion();



}

function myFunction() {
    console.log(1);
    timestart = !timestart;
}

function getquestion() {
    qindex = changeQuestion();
    score++;
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
    timeleft = 10;
    return x;

}

function updateScore() {
    document.getElementById("scorenow").textContent = "Score: " + score;
}

function setQuestion(item) {
    document.getElementById("question").textContent = item.question;
    document.getElementById("c1").textContent = item.choice[0];
    document.getElementById("c2").textContent = item.choice[1];
    document.getElementById("c3").textContent = item.choice[2];
    document.getElementById("c4").textContent = item.choice[3];

}