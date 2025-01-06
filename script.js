const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const colors = [
	"#FF3F8E", 
	"#04C2C9", 
	 
	"#F9D423", 
	"#FF9E1F"];

let particles = [];
let mousePos = { x: 0, y: 0 };

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98; // Shrink over time
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;  // Set shadow blur for glow effect
        ctx.shadowColor = this.color;  // Set shadow color as the particle's color

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Reset shadow properties to avoid affecting other drawings
        ctx.shadowBlur = 0;
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createExplosion(x, y) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedX = (Math.random() * 2 - 1) * 2;
        const speedY = (Math.random() * 2 - 1) * 2;
        particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter((particle) => {
        particle.update();
        particle.draw();
        return particle.size > 0.5;
    });

    requestAnimationFrame(animate);
}

function handleMouseMove(event) {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
}

// Initialize
resizeCanvas();
animate();

// Event listeners
window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousemove", handleMouseMove);

// Function to start random explosions
function startRandomExplosions() {
    // Define the area where explosions should occur (e.g., middle of the page)
    const minX = window.innerWidth / 3;
    const maxX = (window.innerWidth / 3) * 2;
    const minY = window.innerHeight / 3;
    const maxY = (window.innerHeight / 3) * 2;

    // Create a random position within the middle of the page
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    createExplosion(x, y);

    // Set a random interval between 0 to 800 milliseconds for the next explosion
    const nextInterval = Math.random() * 1000;
    setTimeout(startRandomExplosions, nextInterval);
}

// Start the random explosions
startRandomExplosions();