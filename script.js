document.addEventListener('DOMContentLoaded', function () {
    const topicTitle = document.getElementById('topic-title');
    const qaSection = document.getElementById('qa-section');

    if (topicTitle) {
        const topic = new URLSearchParams(window.location.search).get('topic');
        topicTitle.textContent = topic;
        loadQuestions(topic);
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
                <div class="answer">${answer}</div>
                <button class="toggle-answer">Show Answer</button>
            `;

            const toggleButton = qaItem.querySelector('.toggle-answer');
            const answerDiv = qaItem.querySelector('.answer');

            toggleButton.addEventListener('click', () => {
                qaItem.classList.toggle('show-answer');
                toggleButton.textContent = qaItem.classList.contains('show-answer') ? 'Hide Answer' : 'Show Answer';
                
                if (qaItem.classList.contains('show-answer')) {
                    answerDiv.after(toggleButton); // Move button below answer
                } else {
                    toggleButton.after(answerDiv); // Move button back above answer
                }
            });

            qaSection.appendChild(qaItem);
        });
    }
});
