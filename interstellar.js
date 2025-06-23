const canvas = document.getElementById('blackholeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let w = canvas.width;
let h = canvas.height;
let centerX = w / 2;
let centerY = h / 2;

ctx.clearRect(0, 0, w, h);

for (let i = 0; i < 100; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const alpha = Math.random();
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    const radiusX = 1 + Math.random() * 0.2;
    const radiusY = 1 + Math.random() * 0.2;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
}

// function drawSpiralGalaxy(cx, cy, arms = 5, starsPerArm = 400, armSpread = 0.5, galaxyRadius = Math.min(w, h) * 0.38) {
//     for (let arm = 0; arm < arms; arm++) {
//         const armAngle = (2 * Math.PI / arms) * arm;
//         for (let i = 0; i < starsPerArm; i++) {
//             const t = i / starsPerArm;
//             // Spiral equation: angle increases with radius for clear arms
//             const spiralAngle = armAngle + t * 4.5 * Math.PI;
//             // Small random offset to keep arms visible but natural
//             const angle = spiralAngle + (Math.random() - 0.5) * armSpread;
//             const radius = t * galaxyRadius * (0.85 + 0.15 * Math.random());
//             const x = cx + Math.cos(angle) * radius;
//             const y = cy + Math.sin(angle) * radius;
//             // Brighter core, fade outwards
//             const alpha = 0.8 - t * 0.7 + (Math.random() - 0.5) * 0.1;
//             ctx.fillStyle = `rgba(${210 + Math.floor(Math.random()*35)},${210 + Math.floor(Math.random()*35)},255,${alpha})`;
//             ctx.beginPath();
//             ctx.arc(x, y, 0.8 + Math.random() * 1.1, 0, Math.PI * 2);
//             ctx.fill();
//         }
//     }
// }

// // Draw a spiral galaxy at the center of the canvas
// drawSpiralGalaxy(centerX, centerY);

function drawGalaxy() {
    const arms = 4;
    const starsPerArm = 600;
    const radius = 200;

    for(let arm = 0; arm < arms; arm++) {
        const startAngle = (2 * Math.PI / arms) * arm;
        for(let star = 1; star < starsPerArm; star++) {
            const decalage = star / starsPerArm;
            const spiralAngle = startAngle + decalage * 4.5 * Math.PI;
            const armSpread = 0.2;
            const angle = spiralAngle + (Math.random() - 0.5) * armSpread;
            const distanceFromCenter = radius / starsPerArm * star;

            const randomness = decalage * 1;
            const x = centerX + distanceFromCenter * Math.cos(angle) + (Math.random() - 0.5) * randomness;
            const y = centerY + distanceFromCenter * Math.sin(angle) + (Math.random() - 0.5) * randomness;

            const alpha = 1 - decalage;

            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 0.8 + Math.random() * 1.1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

drawGalaxy();