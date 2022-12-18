import { Projectile } from "./Projectile.js";

export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = 70;
        this.height = 100;
        this.position = {
            x: this.canvas.width / 2,
            y: this.canvas.height - this.height
        }





        

        this.leftImages = [];
        this.rightImages = [];
        this.imageIndex = 0;

        for(let i = 0; i <= 7; i++) {
            this.leftImages[i] = new Image();
            this.leftImages[i].src = `images/left/${i + 1}.png`;
        }

        for(let i = 0; i <= 7; i++) {
            this.rightImages[i] = new Image();
            this.rightImages[i].src = `images/right/${i + 1}.png`;
        }

        this.currentImage = this.leftImages;
      







        this.projectiles = [];

        this.keys = [];

        this.velocity = 10;

        addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
        });

        addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
            this.imageIndex = 0;
        });

        addEventListener('keyup', (e) => {
            this.shoot(e);
        });
    }

    draw = () => {
        this.ctx.drawImage(this.currentImage[this.imageIndex], this.position.x, this.position.y, this.width, this.height);
    }

    update = () => {
        this.draw();
        this.movePlayer();
        this.checkWallCollision();
    }

    movePlayer = () => {
        if(this.keys[37] == true) {
            this.position.x -= this.velocity;
            this.currentImage = this.leftImages;

            if(this.imageIndex > 6) {
                this.imageIndex = 0;
            }
            
            this.imageIndex++; 
        }

        if(this.keys[39] == true) {
            this.position.x += this.velocity;
            this.currentImage = this.rightImages;
            
            if(this.imageIndex > 6) {
                this.imageIndex = 0;
            }
            
            this.imageIndex++;
        }
    }

    shoot = (e) => {
        if(e.key == ' ') {
            this.projectiles.push(new Projectile({position: {
                x: (this.position.x + 50) - 20,
                y: this.position.y
            }}))
        }
    }

    checkWallCollision = () => {
        if(this.position.x <= 0) {
            this.position.x = 0;
        } else if(this.position.x >= this.canvas.width - this.width) {
            this.position.x = this.canvas.width - this.width;
        }
    }
}