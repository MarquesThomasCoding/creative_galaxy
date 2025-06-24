const title = document.getElementById('title');

const galaxyCanvas = document.getElementById('galaxyCanvas');
const backgroundCanvas = document.getElementById('backgroundCanvas');
const blackholeCanvas = document.getElementById('blackholeCanvas');
const galaxyCtx = galaxyCanvas.getContext('2d');
const backgroundCtx = backgroundCanvas.getContext('2d');
const blackholeCtx = blackholeCanvas.getContext('2d');

const w = backgroundCanvas.clientWidth * 2;
const h = backgroundCanvas.clientHeight * 2;
const galaxyWidth = galaxyCanvas.clientWidth * 2;
const galaxyHeight = galaxyCanvas.clientHeight * 2;
const blackholeWidth = blackholeCanvas.clientWidth * 2;
const blackholeHeight = blackholeCanvas.clientHeight * 2;

galaxyCanvas.width = galaxyWidth;
galaxyCanvas.height = galaxyHeight;
backgroundCanvas.width = w;
backgroundCanvas.height = h;
blackholeCanvas.width = w;
blackholeCanvas.height = h;

let galaxyCenter = galaxyWidth / 4;
let centerX = blackholeWidth / 2;
let centerY = blackholeHeight / 2;

galaxyCtx.clearRect(0, 0, galaxyWidth, galaxyHeight);
backgroundCtx.clearRect(0, 0, w, h);
blackholeCtx.clearRect(0, 0, w, h);

function drawBackgroundStars() {
    const starsCount = 1000;
    for (let i = 0; i < starsCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const alpha = Math.random();
        backgroundCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        backgroundCtx.shadowColor = backgroundCtx.fillStyle;
        backgroundCtx.shadowBlur = 10;
        const radiusX = 1 + Math.random() * 0.2;
        const radiusY = 1 + Math.random() * 0.2;
        backgroundCtx.beginPath();
        backgroundCtx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
        backgroundCtx.fill();
    }
}

function drawGalaxy() {
    const arms = 2;
    const starsPerArm = 2500;
    const radius = 800;

    for(let arm = 0; arm < arms; arm++) {
        const startAngle = (2 * Math.PI / arms) * arm;
        for(let star = 1; star < starsPerArm; star++) {
            const decalage = star / starsPerArm;
            const spiralAngle = startAngle + decalage * 4.5 * Math.PI;
            const armSpread = 1.5;
            const angle = spiralAngle + (Math.random() - 0.5) * armSpread;
            const distanceFromCenter = radius / starsPerArm * star;

            const randomness = decalage * 120;
            const x = galaxyCenter + distanceFromCenter * Math.cos(angle) + (Math.random() - 0.5) * randomness;
            const y = centerY + distanceFromCenter * Math.sin(angle) + (Math.random() - 0.5) * randomness;

            const alpha = 1 - decalage;

            let color = `rgba(255, 255, 255, ${alpha})`
            galaxyCtx.save();
            galaxyCtx.shadowColor = color;
            galaxyCtx.shadowBlur = 10;
            galaxyCtx.fillStyle = color;
            galaxyCtx.beginPath();
            galaxyCtx.arc(x, y, 0.8 + Math.random() * 1.1, 0, Math.PI * 2);
            galaxyCtx.fill();
            galaxyCtx.restore();
        }
    }

    const coreRadius = 500;
    const coreGradient = galaxyCtx.createRadialGradient(galaxyCenter, centerY, 0, galaxyCenter, centerY, coreRadius);
    coreGradient.addColorStop(0, 'rgb(255, 255, 255)');
    coreGradient.addColorStop(0.1, 'rgba(255, 219, 177, 0.8)');
    coreGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
    coreGradient.addColorStop(0.4, 'rgba(255, 249, 240, 0.3)');
    coreGradient.addColorStop(0.6, 'rgba(180,180,255,0.2)');
    coreGradient.addColorStop(0.8, 'rgba(180,180,255,0.1)');
    coreGradient.addColorStop(1, 'rgba(100,100,150,0)');
    galaxyCtx.beginPath();
    galaxyCtx.arc(galaxyCenter, centerY, coreRadius, 0, Math.PI * 2);
    galaxyCtx.fillStyle = coreGradient;
    galaxyCtx.fill();
}

function drawBlackhole() {
    const blackholeHeight = 200;
    const blackholeRadius = w;
    const blackholeY = h - blackholeHeight + blackholeRadius;

    const shadowLayers = 6;
    for (let i = shadowLayers; i > 0; i--) {
        blackholeCtx.save();
        blackholeCtx.beginPath();
        blackholeCtx.arc(centerX, blackholeY, blackholeRadius + i * 15, Math.PI, 2 * Math.PI, false);
        blackholeCtx.fillStyle = `rgba(255, 255, 255, ${0.05 * i})`;
        blackholeCtx.shadowBlur = 30 + i * 10;
        blackholeCtx.shadowColor = `rgba(255, 200, 100, ${0.2 * i})`;
        blackholeCtx.fill();
        blackholeCtx.closePath();
        blackholeCtx.restore();
    }

    blackholeCtx.save();
    blackholeCtx.beginPath();
    blackholeCtx.fillStyle = 'black';
    blackholeCtx.shadowBlur = 30;
    blackholeCtx.shadowColor = 'rgba(255, 200, 100, 0.8)';
    blackholeCtx.arc(centerX, blackholeY, blackholeRadius, Math.PI, 2 * Math.PI, false);
    blackholeCtx.fill();
    blackholeCtx.closePath();
    blackholeCtx.restore();
}

drawBackgroundStars();
drawGalaxy();
drawBlackhole();

let galaxyParticles = [];

function createGalaxyExplosion() {
    galaxyParticles = [];
    const arms = 2;
    const starsPerArm = 800;
    const radius = 800;

    for (let arm = 0; arm < arms; arm++) {
        const startAngle = (2 * Math.PI / arms) * arm;
        for (let star = 1; star < starsPerArm; star++) {
            const decalage = star / starsPerArm;
            const spiralAngle = startAngle + decalage * 4.5 * Math.PI;
            const armSpread = 1.5;
            const angle = spiralAngle + (Math.random() - 0.5) * armSpread;
            const distanceFromCenter = radius / starsPerArm * star;

            const randomness = decalage * 120;
            const x = galaxyCenter + distanceFromCenter * Math.cos(angle) + (Math.random() - 0.5) * randomness;
            const y = centerY + distanceFromCenter * Math.sin(angle) + (Math.random() - 0.5) * randomness;

            const speed = Math.random() * 8 + 2;
            const particleAngle = Math.random() * Math.PI * 2;

            galaxyParticles.push({
                x,
                y,
                vx: Math.cos(particleAngle) * speed,
                vy: Math.sin(particleAngle) * speed,
                alpha: 1,
                size: Math.random() * 2 + 1
            });
        }
    }
}

function updateGalaxyExplosion() {
    galaxyParticles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.02;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        if (particle.alpha <= 0) {
            galaxyParticles.splice(index, 1);
        }
    });
}

function drawGalaxyExplosion() {
    galaxyParticles.forEach(particle => {
        galaxyCtx.save();
        galaxyCtx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        galaxyCtx.shadowColor = galaxyCtx.fillStyle;
        galaxyCtx.shadowBlur = 15;
        galaxyCtx.beginPath();
        galaxyCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        galaxyCtx.fill();
        galaxyCtx.restore();
    });
}

let coreExpansion = {
    radius: 500,
    alpha: 1
};

function updateCoreExpansion() {
    coreExpansion.radius += 100;
    coreExpansion.alpha -= 0.02;
    if (coreExpansion.alpha <= 0) {
        coreExpansion.alpha = 0;
    }
}

function drawCoreExpansion() {
    const coreGradient = galaxyCtx.createRadialGradient(galaxyCenter, centerY, 0, galaxyCenter, centerY, coreExpansion.radius);
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${coreExpansion.alpha})`);
    coreGradient.addColorStop(0.1, `rgba(255, 219, 177, ${coreExpansion.alpha * 0.8})`);
    coreGradient.addColorStop(0.2, `rgba(255, 255, 255, ${coreExpansion.alpha * 0.6})`);
    coreGradient.addColorStop(0.4, `rgba(255, 249, 240, ${coreExpansion.alpha * 0.3})`);
    coreGradient.addColorStop(0.6, `rgba(180,180,255,${coreExpansion.alpha * 0.2})`);
    coreGradient.addColorStop(0.8, `rgba(180,180,255,${coreExpansion.alpha * 0.1})`);
    coreGradient.addColorStop(1, `rgba(100,100,150,0)`);

    galaxyCtx.save();
    galaxyCtx.beginPath();
    galaxyCtx.arc(galaxyCenter, centerY, coreExpansion.radius, 0, Math.PI * 2);
    galaxyCtx.fillStyle = coreGradient;
    galaxyCtx.fill();
    galaxyCtx.restore();
}

function animateGalaxyExplosion() {
    galaxyCtx.save();
    galaxyCtx.globalAlpha = 0.1;
    galaxyCtx.fillStyle = 'black';
    galaxyCtx.fillRect(0, 0, galaxyWidth, galaxyHeight);
    galaxyCtx.restore();

    backgroundCtx.save();
    backgroundCtx.globalAlpha = 0.1;
    backgroundCtx.fillStyle = 'black';
    backgroundCtx.fillRect(0, 0, w, h);
    backgroundCtx.restore();

    blackholeCtx.save();
    blackholeCtx.globalAlpha = 0.1;
    blackholeCtx.fillStyle = 'black';
    blackholeCtx.fillRect(0, 0, w, h);
    blackholeCtx.restore();

    drawCoreExpansion();
    drawGalaxyExplosion();
    updateCoreExpansion();
    updateGalaxyExplosion();

    if (galaxyParticles.length > 0 || coreExpansion.alpha > 0) {
        requestAnimationFrame(animateGalaxyExplosion);
    } else {
        galaxyCtx.clearRect(0, 0, galaxyWidth, galaxyHeight);
        backgroundCtx.clearRect(0, 0, w, h);
        blackholeCtx.clearRect(0, 0, w, h);
        title.innerText = 'INTERSTELLAR II';
    }
}

function initiateExplosion() {
    createGalaxyExplosion();
    animateGalaxyExplosion();
}

let cursorAngle = 0;
let mouseX = centerX;
let mouseY = centerY;
let lastMouseX = centerX;
let lastMouseY = centerY;


const spaceshipCursor = document.createElement('img');
spaceshipCursor.src = 'spaceship_small.png';
spaceshipCursor.id = 'spaceship-cursor';
spaceshipCursor.style.position = 'fixed';
spaceshipCursor.style.pointerEvents = 'none';
spaceshipCursor.style.zIndex = '1000';
spaceshipCursor.style.left = centerX + 'px';
spaceshipCursor.style.top = centerY + 'px';
spaceshipCursor.style.width = '32px';
spaceshipCursor.style.height = '32px';
document.body.appendChild(spaceshipCursor);

document.body.style.cursor = 'none';


function createTrailDot(x, y, angleDeg) {
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const distance = 20;
    for (let i = 0; i < 3; i++) { 
        const extraDist = distance + i * 4 + Math.random() * 2; 
        const backX = x - Math.cos(angleRad) * extraDist;
        const backY = y - Math.sin(angleRad) * extraDist;
        const dot = document.createElement('div');
        dot.className = 'spaceship-trail-smoke';
        dot.style.position = 'fixed';
        const offsetX = (Math.random() - 0.5) * 4;
        const offsetY = (Math.random() - 0.5) * 4;
        const size = 10 + Math.random() * 6;
        dot.style.left = (backX - size/2 + offsetX) + 'px';
        dot.style.top = (backY - size/2 + offsetY) + 'px';
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(255,255,255,0.12)';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '999';
        dot.style.filter = 'blur(4px)';
        dot.style.transition = 'opacity 1.2s linear';
        dot.style.opacity = '1';
        document.body.appendChild(dot);
        setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 1200);
        }, 1200);
    }
}

function updateSpaceshipCursor() {
    createTrailDot(mouseX, mouseY, cursorAngle);
    spaceshipCursor.style.left = (mouseX - spaceshipCursor.width/2) + 'px';
    spaceshipCursor.style.top = (mouseY - spaceshipCursor.height/2) + 'px';
    spaceshipCursor.style.transform = `rotate(${cursorAngle}deg)`;
}

updateSpaceshipCursor();

window.addEventListener('mousemove', (e) => {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    if (dx !== 0 || dy !== 0) {
        cursorAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    }
    updateSpaceshipCursor();
});