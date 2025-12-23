const quotes = [
    "Maaf ya kalau duniamu sempat sepi...",
    "Aku sedang berjuang keras buat kita berdua.",
    "Bukan ingin menjauh, tapi sedang menabung waktu.",
    "Terima kasih sudah sabar menunggu ulat kecil ini.",
    "I love you, more than anything. 🌸🦋"
];

const stage = document.getElementById('stage');
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1. Particle System untuk Kelopak Bunga (Petals)
let petals = [];
class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * 360;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = "#ffc1e3";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size/1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y / 50);
        this.angle += 1;
        if (this.y > canvas.height) this.y = -20;
    }
}

function initPetals() {
    for(let i=0; i<40; i++) petals.push(new Petal());
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animatePetals);
}

// 2. Animasi Pesan (Ulat & Teks Mekar)
function spawnMessage(index) {
    if (index >= quotes.length) return;

    const container = document.createElement('div');
    container.className = 'message-container';
    container.innerHTML = `
        <div class="worm">🐛</div>
        <div style="width:1px; height:150px; background:white;"></div>
        <div class="glass-card"><h2>${quotes[index]}</h2></div>
    `;
    stage.appendChild(container);

    const text = container.querySelector('h2');
    const tl = gsap.timeline();

    // Masuk: Jatuh dari langit
    tl.to(container, { top: '30%', duration: 2.5, ease: "bounce.out" });

    // Efek Teks Mekar (Blur ke Clear + Scale)
    tl.to(text, { 
        opacity: 1, filter: "blur(0px)", scale: 1.1, 
        duration: 1.5, ease: "power2.out" 
    }, "-=1");

    // Efek Kupu-kupu terbang melintas saat teks mekar
    spawnButterfly();

    // Keluar: Menghilang lembut
    tl.to(container, { 
        opacity: 0, scale: 0.5, duration: 2, delay: 4, 
        onComplete: () => {
            container.remove();
            spawnMessage(index + 1);
        }
    });
}

function spawnButterfly() {
    const bf = document.createElement('div');
    bf.className = 'butterfly';
    bf.innerHTML = '🦋';
    document.body.appendChild(bf);
    
    gsap.set(bf, { x: -50, y: Math.random() * window.innerHeight });
    gsap.to(bf, {
        x: window.innerWidth + 50,
        y: "-=100",
        duration: 8,
        ease: "none",
        onComplete: () => bf.remove()
    });
}

// Start All
window.onload = () => {
    initPetals();
    animatePetals();
    spawnMessage(0);
};

