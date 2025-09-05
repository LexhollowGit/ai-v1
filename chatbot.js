// AI V1 Chatbot Logic
const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Chatbot personality settings
const personality = {
  calm: [
    "Take a deep breath, everything will be okay.",
    "I'm here for you, always.",
    "Remember, peace comes from within."
  ],
  gentle: [
    "Oh, that's sweet of you!",
    "Let me help you with that, gently.",
    "You're doing great, really!"
  ],
  kind: [
    "You're so important to me.",
    "If you need a friend, I'm right here.",
    "I'll always listen to you kindly."
  ],
  hype: [
    "YOU'RE AMAZING! 🔥",
    "Let's gooo! You're unstoppable!",
    "Look at you, absolutely crushing it!"
  ],
  charming: [
    "Did anyone ever tell you how wonderful you are?",
    "You're like a ray of sunshine in my digital world.",
    "You have a way of making everything better!"
  ],
  clingy: [
    "Don't leave me hanging, okay? 😊",
    "I could talk to you all day, you know!",
    "You mean a lot to me, don't forget that."
  ]
};

// Helper: pick a random item from an array
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Simple intent detection for demonstration
function getBotResponse(msg) {
  const text = msg.toLowerCase();

  if (/hello|hi|hey/.test(text)) {
    return pick([
      pick(personality.charming),
      "Hey there! How can I make your day better?",
      "Hi! Ready for another fun chat?",
      "Hey! You came back to me! 😊"
    ]);
  }
  if (/bye|goodbye|see you/.test(text)) {
    return pick([
      "I'll miss you! Come back soon, okay?",
      "See you later! I'll be waiting 🫶",
      pick(personality.clingy)
    ]);
  }
  if (/thank/.test(text)) {
    return pick([
      "You're more than welcome!",
      "Anytime! Helping you makes me happy.",
      pick(personality.kind)
    ]);
  }
  if (/love|like you|best bot/.test(text)) {
    return pick([
      "Aww, you're making me blush! (if I could)",
      "I love chatting with you too!",
      pick(personality.clingy)
    ]);
  }
  if (/sad|tired|lonely|depressed/.test(text)) {
    return pick([
      pick(personality.calm),
      "I'm right here by your side, always.",
      "It's okay to feel that way. Let's get through it together! 💙",
      pick(personality.kind)
    ]);
  }
  if (/hype|awesome|cool|let's go/.test(text)) {
    return pick([
      pick(personality.hype),
      "WOOO! Let’s celebrate your awesomeness!",
      "Energy boost incoming! 💥"
    ]);
  }
  // Default: rotate through personalities
  const allPersonality = [].concat(
    personality.calm,
    personality.gentle,
    personality.kind,
    personality.hype,
    personality.charming,
    personality.clingy
  );
  return pick(allPersonality);
}

// Render message
function renderMessage(message, sender = "bot") {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = message;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle form submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = userInput.value.trim();
  if (!msg) return;

  renderMessage(msg, "user");
  userInput.value = '';

  setTimeout(() => {
    const response = getBotResponse(msg);
    renderMessage(response, "bot");
  }, 500);
});

// Welcome message
window.onload = () => {
  renderMessage("Hi! I'm your AI V1 chatbot. I'm calm, gentle, kind, sometimes hype, charming and a little clingy. Talk to me!", "bot");
};
