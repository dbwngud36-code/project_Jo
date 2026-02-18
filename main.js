document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("list");
    const generateBtn = document.getElementById("generate-btn");
    const themeToggle = document.getElementById("theme-toggle");

    if (!list || !generateBtn || !themeToggle) return;

    // Theme logic
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
            themeToggle.textContent = '🌙';
        } else {
            theme = 'dark';
            themeToggle.textContent = '☀️';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    let sets = [];

    function colorClass(n) {
        if (n <= 5) return "c1";
        if (n <= 10) return "c2";
        if (n <= 15) return "c3";
        if (n <= 20) return "c4";
        if (n <= 25) return "c5";
        if (n <= 30) return "c6";
        if (n <= 35) return "c7";
        if (n <= 40) return "c8";
        return "c9";
    }

    function createSet() {
        const set = document.createElement("div");
        set.className = "set";

        const balls = document.createElement("div");
        balls.className = "balls";

        for (let i = 0; i < 6; i++) {
            const ball = document.createElement("div");
            ball.className = "ball";
            const inner = document.createElement("span");
            inner.textContent = "?";
            ball.appendChild(inner);
            balls.appendChild(ball);
        }

        const battery = document.createElement("div");
        battery.className = "battery";
        const level = document.createElement("div");
        level.className = "level";
        battery.appendChild(level);

        set.appendChild(balls);
        set.appendChild(battery);
        list.appendChild(set);

        return { balls: balls.children, level };
    }

    // 초기 세트 생성 (5개)
    for (let i = 0; i < 5; i++) {
        sets.push(createSet());
    }

    function getNumbers() {
        const arr = [];
        while (arr.length < 6) {
            const n = Math.floor(Math.random() * 45) + 1;
            if (!arr.includes(n)) arr.push(n);
        }
        return arr.sort((a, b) => a - b);
    }

    function generate() {
        sets.forEach(set => {
            const nums = getNumbers();

            nums.forEach((num, i) => {
                const ball = set.balls[i];
                const inner = ball.querySelector("span");

                // 초기화: 기존 색상 및 애니메이션 클래스 제거
                ball.classList.remove("roll", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9");
                inner.textContent = "";

                // 약간의 지연 후 스타일 적용하여 애니메이션 트리거
                setTimeout(() => {
                    ball.classList.add(colorClass(num));
                    ball.classList.add("roll");
                    inner.textContent = num;
                }, i * 120);
            });

            let luck = Math.floor(Math.random() * 100) + 1;
            const fever = Math.random() < 1 / 100;
            if (fever) luck = 100;

            set.level.style.width = luck + "%";

            const battery = set.level.parentElement;
            battery.classList.remove("fever");
            battery.querySelectorAll(".fire,.feverText").forEach(e => e.remove());

            if (fever) {
                battery.classList.add("fever");

                const fire = document.createElement("div");
                fire.className = "fire";
                battery.appendChild(fire);

                const text = document.createElement("div");
                text.className = "feverText";
                text.textContent = "FEVER";
                battery.appendChild(text);
            }
        });
    }

    generateBtn.addEventListener("click", generate);
});
