
// Has the user selected their character
var characterSelected = false;

// Has the user selected the defender
var defenderSelected = false;

// Variable to store the user's chosen character
var character = {};

// Variable to store the chosen enemy
var defender = {};

// Number of enemies defeated
var enemiesDefeated = 0;

// Boolean to indicate whether or not the game is over
gameOver = false;

// ----- Character Objects ----- //

var snoke = {
  name: "Snoke",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var lukeSkywalker = {
  name: "Luke Skywalker",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var rey = {
  name: "Rey",
  health: 200,
  baseAttack: 30,
  attack: 20
};

var kyloRen = {
  name: "Kylo Ren",
  health: 180,
  baseAttack: 25,
  attack: 25
};

// ----- Helper Functions ----- //

// This function will initialize the character value from the global object variables defined above
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

// This function will initialize the enemy's value from the global object variables defined above
function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

// This function will move the remaining characters to the enemies section
function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}

// This function will reset the state of the game
function resetGame() {
  // Reset all the health values to the original
  $("#snoke-character").children(".health").html(snoke.health);
  $("#luke-skywalker-character").children(".health").html(lukeSkywalker.health);
  $("#rey-character").children(".health").html(rey.health);
  $("#kylo-ren-character").children(".health").html(kyloRen.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}


$(document).ready(function() {

  $("#restart").hide();

  $("snoke-character").on("click", function () {
    console.log("Snoke is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(rey);
      characterSelected = true;

      $("#rey-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#snoke-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(kyloRen);
        defenderSelected = true;

        $("#snoke-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#luke-skywalker-character").on("click", function () {
    console.log("Luke Skywalker is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(lukeSkywalker);
      characterSelected = true;

      $("#luke-skywalker-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#luke-skywalker-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(lukeSkywalker);
        defenderSelected = true;

        $("#luke-skywalker-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#snoke-character").on("click", function () {
    console.log("snoke is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(snoke);
      characterSelected = true;

      $("#snoke-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#snoke-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(snoke);
        defenderSelected = true;


        $("#snoke-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#kylo-ren-character").on("click", function () {
    console.log("Kylo Ren is selected");


    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(kyloRen);
      characterSelected = true;

      $("#rey-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);


      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#kylo-ren-character").hasClass("enemy-character")) {
        $("#game-message").empty();


        initializeDefender(kyloRen);
        defenderSelected = true;


        $("#kylo-ren-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    console.log("Attack selected");



    if (characterSelected && defenderSelected && !gameOver) {

      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {

        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }

  });

  $("#restart").on("click", function() {
    console.log("Restart selected");

    resetGame();
  });

});
