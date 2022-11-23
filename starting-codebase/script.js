const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //ctx- shortcut for 'context'
canvas.width = window.innerWidth; // fix canvas items scaling
canvas.height = window.innerHeight;
const particlesArray = []; // defined for init() function

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
    console.log(event);
    // drawCircle();
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
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
        // this.x = mouse.x; // we assign the x coordinate value of this new 'Particle' object  the to mouse.x coordinate value
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; // we set the size to be 1-6
        this.speedX = Math.random() * 3 - 1.5  // we set speed to be from -1.5 to +1.5
        this.speedY = Math.random() * 3 - 1.5
    }

    // we can name the object's methods however we want

    update() {
        this.x += this.speedX; // we set the 'x' property of the 'Particle' object (Particle.x)
        this.y += this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle()); // the 'new' keyword uses the Particle() class to create many particle objects through the constructor() method
    }
}
init();
console.log(particlesArray);

function handleParticles() {
    for (let i =0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCircle()
    handleParticles();
    requestAnimationFrame(animate);
}
animate();