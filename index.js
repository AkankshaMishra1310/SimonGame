var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);
}

$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  //check if recent user answer same as gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $body = $("body").addClass("game-over");
    setTimeout(function() {
      $body.removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $button = $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $button.removeClass("pressed");
  }, 100);
}


$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function startOver(){
  level=0;
  gamePattern=[];
  started= false;
}
