document.addEventListener("DOMContentLoaded", function() {
    const topicsContainer = document.getElementById("topics");
    const qaSection = document.getElementById("qaSection");
    const topicTitle = document.getElementById("topicTitle");

    // Load topics from CSV
    async function loadTopics() {
        const response = await fetch('topics.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const topics = [...new Set(rows.map(row => row.split(',')[0]))];

        topics.forEach(topic => {
            const topicDiv = document.createElement("div");
            topicDiv.classList.add("card");
            topicDiv.innerHTML = `<h3>${topic}</h3>`;
            topicDiv.onclick = () => window.location.href = `topic.html?topic=${topic}`;
            topicsContainer.appendChild(topicDiv);
        });
    }

    // Load questions and answers for a topic
    async function loadQuestions() {
        const params = new URLSearchParams(window.location.search);
        const topic = params.get("topic");
        topicTitle.innerText = topic;

        const response = await fetch('topics.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const qaList = rows.filter(row => row.startsWith(`"${topic}"`));

        qaList.forEach(row => {
            const [_, question, answer] = row.split(',');
            const card = document.createElement("div");
            card.classList.add("card");

            const questionText = document.createElement("p");
            questionText.innerText = question;
            card.appendChild(questionText);

            const answerText = document.createElement("p");
            answerText.classList.add("hidden");
            answerText.innerText = answer;
            card.appendChild(answerText);

            const showButton = document.createElement("button");
            showButton.classList.add("btn", "btn-primary", "button-show");
            showButton.innerText = "Show Answer";
            showButton.onclick = () => {
                answerText.classList.toggle("hidden");
                showButton.innerText = answerText.classList.contains("hidden") ? "Show Answer" : "Hide Answer";
            };

            card.appendChild(showButton);
            qaSection.appendChild(card);
        });
    }

    // Initialize appropriate function based on page
    if (topicsContainer) loadTopics();
    if (qaSection) loadQuestions();
});
