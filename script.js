const quotes = [
    "Hei, maafin aku ya kalau belakangan ini duniamu terasa sepi karena aku terlalu sibuk..",
    "Aku sedang berjuang di luar sana, demi bisa melihat senyummu lebih lama nanti..",
    "Terima kasih sudah menjadi orang paling sabar yang pernah aku kenal.",
    "Jangan pernah ragu, setiap lelahku tujuannya cuma satu: Kamu.",
    "I'm coming home soon. Maafin ulat kecil yang sibuk ini ya? 🐛🤍"
];

const stage = document.getElementById('stage');

function spawnMessage(index) {
    if (index >= quotes.length) {
        // Efek akhir: Munculkan bunga mekar permanen atau reset
        return;
    }

    const container = document.createElement('div');
    container.className = 'message-container';
    container.innerHTML = `
        <div class="worm-wrapper">🐛</div>
        <div class="silk"></div>
        <div class="glass-card">
            <p>${quotes[index]}</p>
        </div>
    `;
    stage.appendChild(container);

    const tl = gsap.timeline();

    // 1. Animasi Masuk: Jatuh Halus dengan Overshoot
    tl.to(container, {
        top: '25%',
        duration: 2.5,
        ease: "back.out(1.2)"
    });

    // 2. Efek Berayun Kena Angin (Ambient Motion)
    gsap.to(container, {
        rotation: 4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 3. Animasi Ulat "Bernapas"
    gsap.to(container.querySelector('.worm-wrapper'), {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // 4. Animasi Keluar: Ditarik ke atas lagi atau terbang
    tl.to(container, {
        top: '-100%',
        duration: 2,
        delay: 5,
        ease: "power3.in",
        onComplete: () => {
            container.remove();
            spawnMessage(index + 1);
        }
    });
}

// Start
window.onload = () => {
    // Tambahkan sedikit delay awal biar smooth
    setTimeout(() => spawnMessage(0), 1000);
};
