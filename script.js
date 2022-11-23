const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //ctx- shortcut for 'context'
canvas.width = window.innerWidth; // fix canvas items scaling
canvas.height = window.innerHeight;
const particlesArray = []; // defined for init() function
let hue = 0; // defined for animate() function

// fix canvas items stretching:
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x; // we assign the value of 'event' DOM object (that we passed as an argument into the callback function) to our custom 'mouse' event values, to make these values global in our code.
    mouse.y = event.y;
    for(let i = 0; i < 10; i++){
        particlesArray.push(new Particle());    
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 5; i++){
        particlesArray.push(new Particle());    
    }
})

// function drawCircle() {
// // we need to call this method when we want to draw shapes made of multiple lines
// // beginPath() method also lets js know that we are starting a new shape that isn't connected to previous lines in our canvas.
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fillStyle = 'orange';
//     ctx.fill();
// }

class Particle {
    constructor() {
        this.x = mouse.x; // we assign the x coordinate value of this new 'Particle' object  the to mouse.x coordinate value
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1; // we set the size to be 1-6
        this.speedX = Math.random() * 3 - 1.5  // we set speed to be from -1.5 to +1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    }

    // we can name the object's methods however we want

    update() {
        this.x += this.speedX; // we set the 'x' property of the 'Particle' object (Particle.x)
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function handleParticles() {
    for (let i =0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y); // sets starting drawing position of the line we want to draw
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = '#08141c0d';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=0.5;
    console.log(particlesArray.length);
    requestAnimationFrame(animate);
}
animate();