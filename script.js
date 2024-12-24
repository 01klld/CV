document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const svg = document.getElementById('network-animation');
const width = window.innerWidth;
const height = window.innerHeight;

svg.setAttribute('width', width);
svg.setAttribute('height', height);

const nodes = [];
const links = [];
const numNodes = 100;

for (let i = 0; i < numNodes; i++) {
    nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() < 0.1) {
            links.push({ source: i, target: j });
        }
    }
}

function update() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    draw();
    requestAnimationFrame(update);
}

function draw() {
    svg.innerHTML = '';

    links.forEach(link => {
        const source = nodes[link.source];
        const target = nodes[link.target];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', '#007bff');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    });

    nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 3);
        circle.setAttribute('fill', '#007bff');
        svg.appendChild(circle);
    });
}

update();

window.addEventListener('resize', () => {
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
});