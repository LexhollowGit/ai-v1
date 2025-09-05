let knowledge = [];

// Load knowledge base safely
fetch('knowledge.json')
  .then(response => response.json())
  .then(data => { knowledge = data; })
  .catch(err => {
    console.error("Failed to load knowledge.json", err);
  });

function findKnowledge(query) {
  const lowerQ = query.toLowerCase();
  for (const entry of knowledge) {
    if (entry.keywords.some(k => lowerQ.includes(k.toLowerCase()))) {
      return entry.answer;
    }
  }
  return null;
}

function getBotResponse(msg) {
  const fact = findKnowledge(msg);
  if (fact) {
    const frames = [
      `Oh! I know this one — ${fact}`,
      `That's a great question. The answer is: ${fact}`,
      `Let me think... Got it! ${fact}`,
      `You're curious! The answer is: ${fact}`,
      `Easy! ${fact}`
    ];
    return frames[Math.floor(Math.random() * frames.length)];
  }
  return "Hmm, I don't know that yet. Want to teach me?";
}

// DOM Elements
const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');

// Add user message to log
function addUserMessage(msg) {
  const div = document.createElement('div');
  div.className = 'message user';
  div.textContent = msg;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Add bot message to log
function addBotMessage(msg) {
  const div = document.createElement('div');
  div.className = 'message bot';
  div.textContent = msg;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Show/hide typing indicator
function showTyping() {
  typingIndicator.style.display = 'flex';
  chatLog.scrollTop = chatLog.scrollHeight;
}
function hideTyping() {
  typingIndicator.style.display = 'none';
}

// Chat form handler
chatForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const msg = userInput.value.trim();
  if (!msg) return;
  addUserMessage(msg);
  userInput.value = '';
  showTyping();

  // Wait for knowledge to load before replying
  const waitForKnowledge = () => {
    if (knowledge.length === 0) {
      setTimeout(waitForKnowledge, 100);
      return;
    }
    setTimeout(() => {
      hideTyping();
      const reply = getBotResponse(msg);
      addBotMessage(reply);
    }, 900 + Math.random() * 800); // 0.9-1.7s delay
  };
  waitForKnowledge();
});
