const loadBtn = document.getElementById('loadBtn');
const resultDiv = document.getElementById('result');

// Фейкові дані У ФОРМАТІ QUOTABLE (як у методичці)
const fallbackQuotes = [
    { content: "Знання — це сила.", author: "Френсіс Бекон" },
    { content: "Час — найцінніший ресурс.", author: "Бенджамін Франклін" },
    { content: "Успіх — це рух від невдачі до невдачі.", author: "Вінстон Черчилль" },
    { content: "Досвід — найкращий учитель.", author: "Юлій Цезар" },
    { content: "Простота — це найвища складність.", author: "Леонардо да Вінчі" }
];

// Вивід цитат
function renderQuotes(data) {
    let html = '<div class="cards">';
    data.forEach(q => {
        html += `
            <div class="card">
                <p>"${q.content}"</p>
                <span>— ${q.author}</span>
            </div>
        `;
    });
    html += '</div>';
    resultDiv.innerHTML = html;
}

// Завантаження цитат
async function loadQuotes() {
    resultDiv.innerHTML = '<p class="loading">Завантаження...</p>';
    loadBtn.disabled = true;

    try {
        const response = await fetch(
            'https://api.quotable.io/quotes/random?limit=5'
        );

        if (!response.ok) {
            throw new Error('HTTP помилка: ' + response.status);
        }

        const data = await response.json();
        renderQuotes(data);

    } catch (error) {
        // ❗ КЛЮЧОВИЙ МОМЕНТ ДЛЯ ЛАБИ
        console.warn('API недоступне, використано fallback');

        resultDiv.innerHTML =
            '<p class="error">API тимчасово недоступне. Показано тестові дані.</p>';

        // Показуємо дані у правильному форматі
        renderQuotes(fallbackQuotes);
    } finally {
        loadBtn.disabled = false;
    }
}

loadBtn.addEventListener('click', loadQuotes);
loadQuotes();
