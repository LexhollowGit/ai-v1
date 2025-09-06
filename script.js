const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace with your OpenAI API key (free tier)
const API_KEY = "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";

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });

function appendMessage(sender, text){
    const div = document.createElement('div');
    div.classList.add('chat-message', sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;
    appendMessage('user', message);
    userInput.value = '';

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:[{role:"user", content: message}],
            temperature:0.7
        })
    });
    const data = await response.json();
    const botReply = data.choices[0].message.content;
    appendMessage('bot', botReply);
}
