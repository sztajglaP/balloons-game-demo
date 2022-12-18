import { Balloon } from "./Balloon.js";
import { Player } from "./Player.js";

window.onload = () => {
    game.startGame();
}

class Game {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.startGameBtn = document.querySelector('.start-game');

        this.board = new Image();
        this.board.src = `images/background.png`;

        this.runningGame = true;

        this.balloons = [];
    }

    startGame = () => {
        this.player = new Player(this.canvas);
        this.balloons.push(new Balloon({position: {
            x: this.canvas.width / 2 - 30,
            y: this.canvas.height / 2
        }}, 'large', 'right'));
        
        if(this.runningGame) {
            this.update();
        }
    }

    update = () => {
        if(!this.runningGame) return;

        requestAnimationFrame(this.update)
        this.clearBoard();
        this.player.update();
        this.checkWallCollision();
        this.checkProjectileCollision();
        this.checkPlayerCollision();
        this.projectileMove();
        this.balloons.forEach(balloon => {
            balloon.update();
        });
    }

    clearBoard = () => {
        this.ctx.drawImage(this.board, 0, 0, 900, 505);
    }
    
    checkWallCollision = () => {
        this.balloons.forEach(balloon => {
            if(balloon.position.y >= balloon.canvas.height - balloon.radius) {
                balloon.direction.y = 'up';
            } else if(balloon.position.y <= this.canvas.height / 2) {
                balloon.direction.y = 'down';
                balloon.velocity.y = balloon.gravity;
            }

            if(balloon.position.x >= this.canvas.width - balloon.radius) {
                balloon.direction.x = 'left';
            } else if(balloon.position.x < 0 + balloon.radius){
                balloon.direction.x = 'right';
            }

            if(balloon.direction.x == 'right') {
                balloon.position.x += balloon.velocity.x;
            } else {
                balloon.position.x -= balloon.velocity.x;
            }

            if(balloon.direction.y == 'down') {
                balloon.position.y += balloon.velocity.y;
                balloon.velocity.y += balloon.gravity;
            } else {
                balloon.position.y -= balloon.velocity.y;
                balloon.velocity.y -= balloon.gravity;
            }
        });
    }

    checkPlayerCollision = () => {
        this.balloons.forEach(balloon => {
            if(balloon.position.x >= this.player.position.x && balloon.position.x <= this.player.position.x + this.player.width && balloon.position.y >= this.player.position.y) {
                this.runningGame = false;
                this.startGameBtn.style.display = 'block';
                this.startGameBtn.addEventListener('click', this.restartGame);
            }
        });
    }

    restartGame = () => {
        this.startGameBtn.style.display = 'none';
        this.runningGame = true;
        this.balloons = [];
        this.startGame();
    }

    checkProjectileCollision = () => {
        this.player.projectiles.forEach((projectile, projectileIndex) => {
            this.balloons.forEach((balloon, balloonIndex) => {
                if(projectile.position.x >= balloon.position.x - balloon.radius && projectile.position.x <= balloon.position.x + balloon.radius && projectile.position.y >= balloon.position.y && projectile.position.y <= balloon.position.y + balloon.radius)  { 
                    this.balloons.splice(balloonIndex, 1);
                    this.player.projectiles.splice(projectileIndex, 1);
                    this.addNewBalloons(balloon);
                }
            });
        });
    }

    addNewBalloons = (balloon) => {
        if(balloon.size == 'large') {
            this.balloons.push(new Balloon({position: {
                x: balloon.position.x,
                y: this.canvas.height / 2
            }}, 'medium', 'right'));
            this.balloons.push(new Balloon({position: {
                x: balloon.position.x,
                y: this.canvas.height / 2
            }}, 'medium', 'left'));
        } else if(balloon.size == 'medium') {
            this.balloons.push(new Balloon({position: {
                x: balloon.position.x,
                y: this.canvas.height / 2
            }}, 'small', 'right'));
            this.balloons.push(new Balloon({position: {
                x: balloon.position.x,
                y: this.canvas.height / 2
            }}, 'small', 'left'));
        }
    }

    projectileMove = () => {
        this.player.projectiles.forEach((projectile, index) => {
            projectile.update();

            if(projectile.position.y <= 0) {
                this.removeProjectileFromArray();
            }
        });
    }

    removeProjectileFromArray = (index) => {
        this.player.projectiles.splice(index, 1);
    }
}

const game = new Game();