window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game(); //without const, new Game is added
    game.start(); //new Game is created, no this., invoked with start method
  }


  //function that handles keydown event: 
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    //check if the pressed key is in the possibleKeyStrokes array: 
    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      //update player's directionX and Y based on key pressed: 
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

   function handleKeyUp(e) {
        switch (e.key) {
            case "ArrowLeft":
            case "ArrowRight":
                game.player.directionX = 0;
                break;
            case "ArrowUp":
            case "ArrowDown":
                game.player.directionY = 0;
                break;
        }
      }

  //add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyUp); 


  restartButton.addEventListener("click", function () {
    restartGame; 
  }); 

  function restartGame() {
    location.reload(); 
  }
};

