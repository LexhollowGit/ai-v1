const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let model;

// Load GPT-2 model
(async () => {
  chatOutput.innerHTML += `<div>Loading AI model... please wait.</div>`;
  model = await window.transformers.pipeline('text-generation', 'gpt2');
  chatOutput.innerHTML += `<div>AI is ready!</div>`;
})();

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || !model) return;

  chatOutput.innerHTML += `<div><b>You:</b> ${message}</div>`;
  chatInput.value = '';
  chatOutput.scrollTop = chatOutput.scrollHeight;

  chatOutput.innerHTML += `<div><b>AI:</b> ...thinking...</div>`;
  chatOutput.scrollTop = chatOutput.scrollHeight;

  const response = await model(message, { max_length: 50 });
  chatOutput.innerHTML = chatOutput.innerHTML.replace('...thinking...', response[0].generated_text);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if(e.key === 'Enter') sendMessage(); });
