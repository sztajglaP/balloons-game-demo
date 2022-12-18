export class Projectile {
    constructor({position}) {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.position = position;
        this.radius = 5;
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
    }

    update = () => {
        this.draw();
        this.position.y -= 10;
    }
}