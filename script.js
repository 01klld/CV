// Add smooth scrolling to navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Bug animation
const canvas = document.getElementById('bug-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bugs = [];
const bugImage = new Image();
bugImage.src = 'https://img.icons8.com/ios-filled/50/ff0000/bug.png'; // Bug icon

class Bug {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10; // Size of the bug icon
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around the edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.drawImage(bugImage, this.x, this.y, this.size, this.size);
    }
}

function init() {
    bugs = [];
    const numberOfBugs = 30; // Number of bugs
    for (let i = 0; i < numberOfBugs; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        bugs.push(new Bug(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bugs.forEach(bug => {
        bug.update();
        bug.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

bugImage.onload = () => {
    init();
    animate();
};