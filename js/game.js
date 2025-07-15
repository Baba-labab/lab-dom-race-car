class Game {
    constructor() {
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#end-game")
        this.player = new Player(
            this.gameScreen,
            200,
            500,
            100,
            150,
            "./images/car.png"
        );
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000 / 60); //60fps
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`

        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    };

    gameLoop() {
        console.log("in the game loop");

        this.update();

        //if gameisOver is set to true clear the interval
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }

    };

    update() {
        console.log("in the update");
        this.player.move();

        //iterate through list of obstacles and check for collision
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                //remove obstacle fromDOM
                obstacle.element.remove();
                //remove obstacle from array
                this.obstacles.splice(i, 1);
                //redue life
                this.lives--;
                //update the counter variable to account to removed obstacle
                i--;

                //if obstacle off screen, remove obstacle from game, increas scroe +1
            } else if (obstacle.top > this.height) {
                this.score++;
                obstacle.element.remove;
                this.obstacles.splice(i, 1);
                i--;
            }
        }
        //check if player is dead, if so, end game
        if (this.lives === 0) {
            this.endGame();
        }

        //randomly generate new obstacle if no other obstacle is on sceen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }
            endGame() {
                // remove player and obstacles from DOM
                this.player.element.remove;
                this.obstacles.forEach(obstacle => obstacle.element.remove());
                //set gameIsOver to true
                this.gameIsOver = true;
                //hide gameScreen
                this.gameScreen.style.display = "none";
                //show endScreen
                this.gameEndScreen.style.display = "block"
            }
        

    
}