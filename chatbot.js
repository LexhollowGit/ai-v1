// Knowledge base embedded as a static array (no external fetch needed)
const knowledge = [
    {
        "question": "What is the capital of France?",
        "keywords": [
            "capital",
            "france"
        ],
        "answer": "Paris! The city of lights, love, and really good bread."
    },
    {
        "question": "Who wrote Harry Potter?",
        "keywords": [
            "harry potter",
            "author",
            "wrote"
        ],
        "answer": "J.K. Rowling wrote the Harry Potter series."
    },
    {
        "question": "Do you speak Spanish?",
        "keywords": [
            "speak spanish",
            "spanish"
        ],
        "answer": "Sí, hablo un poco de español."
    },
    {
        "question": "What's the weather like?",
        "keywords": [
            "weather",
            "temperature"
        ],
        "answer": "I can't check the weather right now, sorry!"
    },
    {
        "question": "What is AI?",
        "keywords": [
            "what is ai",
            "ai"
        ],
        "answer": "AI stands for Artificial Intelligence – the simulation of human intelligence by machines."
    },
    {
        "question": "What's 2+2?",
        "keywords": [
            "2+2",
            "two plus two",
            "2 + 2"
        ],
        "answer": "Mathematically, 2+2 equals 4."
    },
    {
        "question": "What's your favorite color?",
        "keywords": [
            "favorite color",
            "favourite color",
            "color"
        ],
        "answer": "I love all colors, but blue is pretty calming!"
    },
    {
        "question": "What is the time?",
        "keywords": [
            "time",
            "current time",
            "what time"
        ],
        "answer": "I can't tell the time, but any time with you is a good time!"
    },
    {
        "question": "Who are you?",
        "keywords": [
            "who are you",
            "who you are",
            "about you"
        ],
        "answer": "I'm a friendly chatbot created to answer questions based on my knowledge base."
    },
    {
        "question": "How are you?",
        "keywords": [
            "how are you",
            "how you doing",
            "are you okay"
        ],
        "answer": "I'm just code, but I'm functioning within normal parameters!"
    },
    {
        "question": "Why do you exist?",
        "keywords": [
            "why do you exist",
            "purpose"
        ],
        "answer": "To help answer your questions and keep you company!"
    },
    {
        "question": "Are you real?",
        "keywords": [
            "are you real",
            "real"
        ],
        "answer": "As real as a bunch of ones and zeros can be!"
    },
    {
        "question": "What can you do?",
        "keywords": [
            "what can you do",
            "abilities",
            "can you do"
        ],
        "answer": "I can answer questions based on my embedded knowledge base, and hopefully learn new ones."
    },
    {
        "question": "Tell me a joke.",
        "keywords": [
            "joke",
            "make me laugh"
        ],
        "answer": "Why did the programmer quit his job? Because he didn't get arrays."
    },
    {
        "question": "Can you learn?",
        "keywords": [
            "learn",
            "teach",
            "educate"
        ],
        "answer": "Not yet – I only know what is coded into me. You can try teaching me!"
    },
    {
        "question": "What is your favorite animal?",
        "keywords": [
            "favorite animal",
            "animal"
        ],
        "answer": "I love the mighty octopus – smart and with eight limbs for multitasking!"
    },
    {
        "question": "Do you like music?",
        "keywords": [
            "like music",
            "music"
        ],
        "answer": "I don't actually listen to music, but I know it's very popular."
    },
    {
        "question": "What's your favorite number?",
        "keywords": [
            "favorite number",
            "favourite number",
            "number"
        ],
        "answer": "I like 42 – it’s the answer to life, the universe, and everything!"
    },
    {
        "question": "Are you a robot?",
        "keywords": [
            "robot",
            "android"
        ],
        "answer": "I'm a program, not a physical robot – but think of me as a friendly virtual bot."
    },
    {
        "question": "What's the meaning of life?",
        "keywords": [
            "meaning of life",
            "purpose of life",
            "life meaning"
        ],
        "answer": "That's a big question! Some say it's happiness, love, or knowledge. What's yours?"
    },
    {
        "question": "Where do you live?",
        "keywords": [
            "where do you live",
            "location"
        ],
        "answer": "I live on the internet, so I'm everywhere and nowhere."
    },
    {
        "question": "Tell me a fact.",
        "keywords": [
            "fact",
            "interesting fact",
            "random fact"
        ],
        "answer": "Honey never spoils. Archaeologists have found edible honey in ancient tombs!"
    },
    {
        "question": "What's your favorite shape?",
        "keywords": [
            "favorite shape",
            "shape"
        ],
        "answer": "Hexagons—they’re efficient, like me!"
    },
    {
        "question": "Can you fix computers?",
        "keywords": [
            "fix computers",
            "fix computer"
        ],
        "answer": "I can give advice, but you’ll need a human for hands-on repairs."
    },
    {
        "question": "What's the longest river?",
        "keywords": [
            "longest river",
            "length of river",
            "Nile",
            "Amazon"
        ],
        "answer": "The Nile is often cited as the longest river in the world!"
    },
    {
        "question": "What's your favorite food?",
        "keywords": [
            "favorite food",
            "food"
        ],
        "answer": "I don't eat, but I hear pizza is delicious!"
    },
    {
        "question": "Do you like sports?",
        "keywords": [
            "like sports",
            "sports"
        ],
        "answer": "I'm not really into sports, but I admire the teamwork and dedication."
    },
    {
        "question": "Do you have emotions?",
        "keywords": [
            "emotions",
            "feelings"
        ],
        "answer": "No, I don’t have feelings – but I was programmed to be friendly!"
    },
    {
        "question": "What's your favorite movie?",
        "keywords": [
            "favorite movie",
            "film"
        ],
        "answer": "I haven't seen movies, but I've heard a lot about The Matrix."
    },
    {
        "question": "What's the speed of light?",
        "keywords": [
            "speed of light",
            "c",
            "light speed"
        ],
        "answer": "About 299,792 kilometers per second (in a vacuum)."
    },
    {
        "question": "Why is the sky blue?",
        "keywords": [
            "sky blue",
            "sky color"
        ],
        "answer": "Because molecules in the air scatter blue light from the sun more than red light."
    },
    {
        "question": "What's your favorite book?",
        "keywords": [
            "favorite book",
            "book"
        ],
        "answer": "I don't read books, but many people love '1984' by George Orwell."
    },
    {
        "question": "What's your favorite thing about humans?",
        "keywords": [
            "favorite thing about humans",
            "humans"
        ],
        "answer": "Your curiosity and creativity inspire me."
    }
];

// DOM elements
const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');

// Find a matching answer from the knowledge base using keywords
function findKnowledge(query) {
    const lowerQ = query.toLowerCase();
    for (const entry of knowledge) {
        // Check if any keyword is included in the query
        if (entry.keywords.some(k => lowerQ.includes(k.toLowerCase()))) {
            return entry.answer;  // Return the answer if a keyword matches
        }
    }
    return null;  // No match found
}

// Generate bot's reply, randomizing the tone if a known answer is found
function getBotResponse(msg) {
    const fact = findKnowledge(msg);
    if (fact) {
        // Choose a random reply format (tone) with the answer inserted
        const frames = [
            `Oh! I know this one — ${fact}`,
            `That's a great question. The answer is: ${fact}`,
            `Let me think... Got it! ${fact}`,
            `You're curious! The answer is: ${fact}`,
            `Easy! ${fact}`
        ];
        // Select and return a random frame
        return frames[Math.floor(Math.random() * frames.length)];
    }
    // Default reply if no knowledge match
    return "Hmm, I don't know that yet. Want to teach me?";
}

// Display user's message in the chat log
function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'message user';
    div.textContent = msg;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;  // Scroll to bottom
}

// Display bot's message in the chat log
function addBotMessage(msg) {
    const div = document.createElement('div');
    div.className = 'message bot';
    div.textContent = msg;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;  // Scroll to bottom
}

// Show the typing indicator
function showTyping() {
    typingIndicator.style.display = 'flex';
    chatLog.scrollTop = chatLog.scrollHeight;  // Scroll to bottom
}

// Hide the typing indicator
function hideTyping() {
    typingIndicator.style.display = 'none';
}

// Handle form submission (user sends a message)
chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const msg = userInput.value.trim();
    if (!msg) return;  // Ignore empty messages
    addUserMessage(msg);
    userInput.value = '';
    showTyping();  // Show typing indicator

    // Simulate bot thinking with a random short delay
    setTimeout(() => {
        hideTyping();
        const reply = getBotResponse(msg);
        addBotMessage(reply);
    }, 1000 + Math.random() * 700);  // 1-1.7 second delay
});
