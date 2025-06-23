const canvas = document.getElementById('blackholeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let w = canvas.width;
let h = canvas.height;
let centerX = w / 2;
let centerY = h / 2;

ctx.clearRect(0, 0, w, h);

for (let i = 0; i <1000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const alpha = Math.random();
    const colors = [
        `rgba(255,255,255,${alpha})`, // white
        `rgba(100,180,255,${alpha})`, // blue
        `rgba(255,120,80,${alpha})`   // red/orange
    ];
    ctx.save();
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 10;
    const radiusX = 1 + Math.random() * 0.2;
    const radiusY = 1 + Math.random() * 0.2;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawGalaxy() {
    const arms = 2;
    const starsPerArm = 800;
    const radius = 500;

    for(let arm = 0; arm < arms; arm++) {
        const startAngle = (2 * Math.PI / arms) * arm;
        for(let star = 1; star < starsPerArm; star++) {
            const decalage = star / starsPerArm;
            const spiralAngle = startAngle + decalage * 4.5 * Math.PI;
            const armSpread = 0.7;
            const angle = spiralAngle + (Math.random() - 0.5) * armSpread;
            const distanceFromCenter = radius / starsPerArm * star;

            const randomness = decalage * 120;
            const x = centerX + distanceFromCenter * Math.cos(angle) + (Math.random() - 0.5) * randomness;
            const y = centerY + distanceFromCenter * Math.sin(angle) + (Math.random() - 0.5) * randomness;

            const alpha = 1 - decalage;

            // Randomly choose star color: white, blue, or orange/red
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

    const coreRadius = 300;
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
    coreGradient.addColorStop(0, 'rgb(255, 255, 255)');
    coreGradient.addColorStop(0.1, 'rgba(255, 219, 177, 0.8)');
    coreGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
    coreGradient.addColorStop(0.4, 'rgba(255, 249, 240, 0.3)');
    coreGradient.addColorStop(0.6, 'rgba(180,180,255,0.2)');
    coreGradient.addColorStop(0.8, 'rgba(180,180,255,0.1)');
    coreGradient.addColorStop(1, 'rgba(100,100,150,0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();

    ctx.font = "90px serif";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("INTER   TELLAR", centerX - 300, centerY + 30);
}

drawGalaxy();