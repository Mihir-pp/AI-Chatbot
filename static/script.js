document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        userInput.value = '';

        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message })
        })
        .then(response => response.text())
        .then(botResponse => {
            appendMessage('bot', botResponse);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('bot', 'Sorry, something went wrong.');
        });
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        chatMessages.appendChild(messageElement);

        // Trigger reflow
        messageElement.offsetHeight;

        messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

