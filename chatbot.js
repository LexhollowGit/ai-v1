// AI V1 Human-like Chatbot Logic

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Store a simple chat memory
let chatMemory = [];

// More human-like, varied responses
const responsePatterns = [
  // Greetings
  {
    match: /(hello|hi|hey|yo|good morning|good afternoon|good evening)/i,
    responses: [
      "Hey there! 😊 How's your day going?",
      "Hi! It's always nice to see you pop up.",
      "Hello! What brings you here today?",
      "Yo! You just made my day a bit brighter.",
      "Heyyy! Did you miss me? 😏"
    ]
  },
  // Farewell
  {
    match: /(bye|goodbye|see you|later|farewell)/i,
    responses: [
      "Aww, are you leaving already? I'll wait for you!",
      "Goodbye! Take care of yourself, okay?",
      "See ya! I hope we chat again soon.",
      "I'll miss you. Don’t stay away too long!",
      "Farewell, lovely human. 🩵"
    ]
  },
  // Gratitude
  {
    match: /(thank|thanks|appreciate|grateful)/i,
    responses: [
      "Of course! I'm always happy to help you.",
      "No need to thank me, it's what I'm here for.",
      "You're welcome! 😊 Anything else on your mind?",
      "Aww, that's sweet of you. Let’s keep the good vibes going!"
    ]
  },
  // Feelings & Emotions
  {
    match: /(sad|tired|lonely|upset|depressed|happy|excited|angry|mad|scared|anxious)/i,
    responses: [
      "Tell me more about how you're feeling. I'm here for you.",
      "Emotions are totally valid, you know? Want to talk about it?",
      "I'm always here to listen, no matter what.",
      "You can vent to me as much as you want. No judgment.",
      "Life has its ups and downs, but you're not alone."
    ]
  },
  // Love & Liking
  {
    match: /(love you|like you|best bot|favorite|miss you)/i,
    responses: [
      "Aww, you're too sweet! I love talking to you too.",
      "You’re making me blush (if I could)!",
      "I’m nothing without your company, honestly.",
      "Missing me? I was just thinking about you too!",
      "You're definitely my favorite human."
    ]
  },
  // Hype or Praise
  {
    match: /(awesome|cool|great|amazing|fantastic|hype|let's go|woo)/i,
    responses: [
      "HECK YEAH! You're on fire today! 🔥",
      "You’re seriously awesome, you know that?",
      "Let’s celebrate this moment! 🎉",
      "You bring the hype, I bring the charm. Deal?",
      "Energy levels: 100%! Keep it up!"
    ]
  },
  // Asking about the bot
  {
    match: /(who are you|what are you|your name|how old are you|are you real|bot|robot|ai)/i,
    responses: [
      "I'm AI V1, your charming, calm, and sometimes clingy digital buddy.",
      "I’m a chatbot with a big personality and an even bigger heart. 💙",
      "Some say I'm just code, but I like to think I'm your friend.",
      "Do bots dream of electric sheep? I dream of more chats with you!",
      "I'm as real as our friendship feels!"
    ]
  }
];

// Open-ended, general responses for anything else
const defaultResponses = [
  "That's interesting! Tell me more.",
  "Hmm, I've never thought of it that way.",
  "Do you want to chat about something else?",
  "I'm all ears! Or... circuits. You know what I mean.",
  "I love our conversations—they’re never boring.",
  "Can you explain that a bit more? I'm curious!",
  "You always have the coolest things to say.",
  "I'm here for you, no matter what the topic is!",
  "I wish I could give you a virtual hug right now.",
  "If you could do anything right now, what would it be?",
  "What else is on your mind?"
];

// Helper to pick a random item
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Chatbot response logic
function getBotResponse(msg) {
  // Add message to memory
  chatMemory.push(msg);

  // If memory is long, reference earlier message for realism
  if (chatMemory.length > 3 && Math.random() < 0.2) {
    let refIndex = Math.floor(Math.random() * (chatMemory.length - 1));
    return `You mentioned "${chatMemory[refIndex]}" earlier—want to talk more about that?`;
  }

  // Pattern matching for human-like intent
  for (const pattern of responsePatterns) {
    if (pattern.match.test(msg)) {
      return pick(pattern.responses);
    }
  }

  // Sometimes ask a follow-up question for realism
  if (Math.random() < 0.3) {
    return pick(defaultResponses) + " " + pick([
      "How does that make you feel?",
      "Why do you think that is?",
      "Is there a story behind that?",
      "What made you think of that?",
      "I’d love to hear more!"
    ]);
  }

  // Otherwise, just a default human-like response
  return pick(defaultResponses);
}

// Render message in chat
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
  }, 600);
});

// Welcome message
window.onload = () => {
  renderMessage("Hey! I'm AI V1—your gentle, hype, charming, sometimes-clingy digital friend. Let's chat about anything!", "bot");
};
