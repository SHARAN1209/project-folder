// Function to load topic data from CSV
function loadTopic(topic) {
  // Set the topic title
  document.getElementById('topic-title').textContent = topic.toUpperCase();

  // Show the Q&A section
  document.getElementById('qa-section').style.display = 'block';

  // Clear previous content
  document.getElementById('qa-content').innerHTML = '';

  // Fetch CSV file based on topic
  fetch(`data/${topic}.csv`)
    .then(response => response.text())
    .then(data => {
      const qaContent = document.getElementById('qa-content');

      // Parse CSV data
      const lines = data.split('\n');
      lines.forEach(line => {
        const [question, answer] = line.split(',');

        if (question && answer) {
          // Create a container for each Q&A item
          const qaItem = document.createElement('div');
          qaItem.classList.add('qa-item');

          // Create the question element
          const questionElem = document.createElement('div');
          questionElem.classList.add('question');
          questionElem.textContent = `Q: ${question}`;

          // Create the answer element, initially hidden
          const answerElem = document.createElement('div');
          answerElem.classList.add('answer');
          answerElem.textContent = `A: ${answer}`;

          // Create the "Show Answer" button
          const showAnswerBtn = document.createElement('button');
          showAnswerBtn.classList.add('show-answer-btn');
          showAnswerBtn.textContent = "Show Answer";
          
          // Add an event listener to the button to toggle the answer visibility
          showAnswerBtn.addEventListener('click', () => {
            answerElem.classList.add('visible');
            showAnswerBtn.style.display = 'none'; // Hide the button once clicked
          });

          // Append elements to the Q&A item container
          qaItem.appendChild(questionElem);
          qaItem.appendChild(showAnswerBtn);
          qaItem.appendChild(answerElem);

          // Append the Q&A item to the main content area
          qaContent.appendChild(qaItem);
        }
      });
    })
    .catch(error => {
      console.error('Error loading topic data:', error);
      document.getElementById('qa-content').textContent = 'Error loading data.';
    });
}

// Function to toggle dark and light mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}
