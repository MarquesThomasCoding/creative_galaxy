const canvas = document.getElementById('blackholeCanvas');
const ctx = canvas.getContext('2d');
const w = canvas.clientWidth * 2;
const h = canvas.clientHeight * 2;

canvas.width = w;
canvas.height = h;

let galaxyCenter = w / 4;
let centerX = w / 2;
let centerY = h / 2;

ctx.clearRect(0, 0, w, h);

function drawBackgroundStars() {
    const starsCount = 1000;
    for (let i = 0; i < starsCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const alpha = Math.random();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        const radiusX = 1 + Math.random() * 0.2;
        const radiusY = 1 + Math.random() * 0.2;
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
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
            ctx.save();
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 0.8 + Math.random() * 1.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const coreRadius = 500;
    const coreGradient = ctx.createRadialGradient(galaxyCenter, centerY, 0, galaxyCenter, centerY, coreRadius);
    coreGradient.addColorStop(0, 'rgb(255, 255, 255)');
    coreGradient.addColorStop(0.1, 'rgba(255, 219, 177, 0.8)');
    coreGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
    coreGradient.addColorStop(0.4, 'rgba(255, 249, 240, 0.3)');
    coreGradient.addColorStop(0.6, 'rgba(180,180,255,0.2)');
    coreGradient.addColorStop(0.8, 'rgba(180,180,255,0.1)');
    coreGradient.addColorStop(1, 'rgba(100,100,150,0)');
    ctx.beginPath();
    ctx.arc(galaxyCenter, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();
}

function drawBlackhole() {
    const blackholeHeight = 200;
    const blackholeRadius = w;
    const blackholeY = h - blackholeHeight + blackholeRadius;

    const shadowLayers = 6;
    for (let i = shadowLayers; i > 0; i--) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, blackholeY, blackholeRadius + i * 15, Math.PI, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 * i})`;
        ctx.shadowBlur = 30 + i * 10;
        ctx.shadowColor = `rgba(255, 200, 100, ${0.2 * i})`;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(255, 200, 100, 0.8)';
    ctx.arc(centerX, blackholeY, blackholeRadius, Math.PI, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function drawTitle() {
    ctx.shadowBlur = 0;
    ctx.font = '160px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('INTERSTELLAR II', w - 800, centerY);
    ctx.font = '30px Arial';
    ctx.fillText('A FILM BY Christopher Nolan', w - 800, centerY + 60);
}

drawBackgroundStars();
drawGalaxy();
drawBlackhole();
drawTitle();