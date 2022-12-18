export class Balloon {
    constructor({position}, size, directionX) {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.position = position;
        this.radius = undefined;

        this.gravity = 0.2;

        this.size = size;

        this.velocity = {
            x: 3,
            y: 1
        };

        this.direction = {
            x: directionX,
            y: 'down'
        };
    }

    setBalloonSize = () => {
        switch(this.size) {
            case 'large':
                this.radius = 30;
                break;
            case 'medium':
                this.radius = 20;
                break;
            case 'small':
                this.radius = 10;
                break;
        }
    }

    draw = () => {
        this.setBalloonSize();
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }

    update = () => {
        this.draw();
    }
}