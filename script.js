document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('toggle-mode');
    const backButton = document.getElementById('back-button');
    modeToggle.addEventListener('click', toggleMode);
    backButton && backButton.addEventListener('click', () => window.history.back());

    const topicTitle = document.getElementById('topic-title');
    const qaSection = document.getElementById('qa-section');

    if (topicTitle) {
        const topic = new URLSearchParams(window.location.search).get('topic');
        topicTitle.textContent = topic;
        loadQuestions(topic);
    }

    function toggleMode() {
        document.body.classList.toggle('dark-mode');
    }

    function loadQuestions(topic) {
        fetch('questions.csv')
            .then(response => response.text())
            .then(data => {
                const questions = parseCSV(data, topic);
                renderQuestions(questions);
            });
    }

    function parseCSV(data, topic) {
        const lines = data.split('\n');
        return lines
            .map(line => line.split(','))
            .filter(([csvTopic]) => csvTopic.trim() === topic)
            .map(([, question, answer]) => ({ question, answer }));
    }

    function renderQuestions(questions) {
        questions.forEach(({ question, answer }, index) => {
            const qaItem = document.createElement('div');
            qaItem.className = 'qa-item';
            qaItem.innerHTML = `
                <div class="question">${index + 1}. ${question}</div>
                <button class="toggle-answer">Show Answer</button>
                <div class="answer">${answer}</div>
            `;

            qaItem.querySelector('.toggle-answer').addEventListener('click', () => {
                qaItem.classList.toggle('show-answer');
                qaItem.querySelector('.toggle-answer').textContent = qaItem.classList.contains('show-answer') ? 'Hide Answer' : 'Show Answer';
            });

            qaSection.appendChild(qaItem);
        });
    }
});
