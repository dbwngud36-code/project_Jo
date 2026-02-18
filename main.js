const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme logic
const currentTheme = localStorage.getItem('theme') || 'light';
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

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number');
        numberDiv.textContent = number;
        lottoNumbersContainer.appendChild(numberDiv);
    }
});
