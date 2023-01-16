/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

ctx.fillStyle = 'rgba(70,50,250, 0)';

ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 0;
ctx.shadowColor = 'rgba(140, 20, 0, 0.5)';

// ctx.globalCompositeOperation = 'destination-over';
ctx.globalCompositeOperation = 'destination-over';

class Root {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 15 + 10;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.5;
        this.angleX = Math.random() * 6.2;
        this.vax = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 - 0.3;
        this.angle = 0;
        this.va = Math.random() * 0.02 + 0.05;
        this.lightness = 10;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        this.angle += this.va;
        if (this.lightness < 70) this.lightness += 0.25;
        if (this.size < this.maxSize) {
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // ctx.fillStyle = 'hsl(140, 100%,' + this.lightness + '%)';
            // ctx.fill();
            // ctx.stroke();

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
            
            let double = this.size * 2;
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgb(0,180,190)';
            ctx.strokeRect(0 - double/2, 0 - double/2, double, double);

            let triple = this.size * 3
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = 'rgb(0,50,230)';
            ctx.strokeRect(0 - triple/2, 0 - triple/2, triple, triple);

            requestAnimationFrame(this.update.bind(this));
            ctx.restore();
        }
        
         // else {
        //     const flower = new Flower(this.x, this.y, this.size);
        //     flower.grow();
        // }
    }
}

// class Flower {
//     constructor(x, y, size) {
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.vs = Math.random() * 0.3 + 0.2;
//         this.maxFlowerSize = this.size + Math.random() * 100;
//         this.image = new Image();
//         this.image.arc = 'flowers.png';
//         this.frameSize = 100; 
//         this.frameX = Math.floor(Math.random() * 3);
//         this.frameY = Math.floor(Math.random() * 3);
//         this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
//         this.angle = 0;
//         this.va = Math.random() * 0.05 - 0.025;
//     };
//     grow(){
//         if (this.size < this.maxFlowerSize && this.willFlower) {
//             this.size += this.vs;
//             this.angle += this.va;
            
//             ctx.save();
//             ctx.translate(this.x, this.y);
//             ctx.rotate(this.angle);
//             ctx.drawImage(this.image, this.frameSize * this.frameX, this.frameSize * this.frameY, this.frameSize, this.frameSize, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
//             ctx.restore();

//             requestAnimationFrame(this.grow.bind(this));
//         }
//     }

// }

window.addEventListener('mousemove', function(e){
    if (drawing) {
        for (let i = 0; i < 3; i++){
            const root = new Root(e.x, e.y);
            root.update();
        }
    }
});
window.addEventListener('mousedown', function(e){
    drawing = true;
    for (let i = 0; i < 30; i++){
        const root = new Root(e.x, e.y);
        root.update();
    }
});
window.addEventListener('mouseup', function(){
    drawing = false;
});