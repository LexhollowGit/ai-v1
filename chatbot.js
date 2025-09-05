let knowledge = [];

// Load knowledge base
fetch('knowledge.json')
  .then(response => response.json())
  .then(data => { knowledge = data; });

function findKnowledge(query) {
  const lowerQ = query.toLowerCase();
  // Simple keyword match
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
    // Frame the answer in a more human-like way
    const frames = [
      `Oh! I know this one — ${fact}`,
      `That's a great question. The answer is: ${fact}`,
      `Let me think... Got it! ${fact}`,
      `You're curious! The answer is: ${fact}`,
      `Easy! ${fact}`
    ];
    return frames[Math.floor(Math.random() * frames.length)];
  }
  // Fallback if not found
  return "Hmm, I don't know that yet. Want to teach me?";
}
