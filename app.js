// Enhanced PixelAI app.js
// Handles memory, KB matching, streaming replies, UI wiring


const APP = (() => {
// Personality/config
const persona = {
name: 'PixelAI',
vibes: ['quirky','helpful','slightly sassy'],
emoji: ['✨','🤖','💡','🧠','⚙️','🚀'],
signOffs: ['Need more deets? I gotchu.','Curiosity mode: always on.','Ping me with another one!'],
typingBaseMs: 500,
typingPerCharMs: 20,
typingMaxMs: 3000,
streamChunkMs: 30 // per char reveal during streaming
};


// State + persistent memory
const state = {
stylize: false, // random case
theme: 'dark',
memory: {name:null, likes:[], facts:{}, history:[] }
};


// Helpers
const $ = (id)=>document.getElementById(id);
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function pickEmoji(){ return pick(persona.emoji); }


// Persist/load
function load(){
try{
const raw = localStorage.getItem('pixelai_mem');
if(raw) state.memory = JSON.parse(raw);
}catch(e){ console.warn('load failed',e) }
renderMemory();
}
function save(){ localStorage.setItem('pixelai_mem', JSON.stringify(state.memory)); renderMemory(); }
function clearMemory(){ localStorage.removeItem('pixelai_mem'); state.memory = {name:null,likes:[],facts:{},history:[]}; renderMemory(); }


function renderMemory(){
$('savedName').textContent = state.memory.name || '(not set)';
$('savedLikes').textContent = state.memory.likes.length ? state.memory.likes.join(', ') : '—';
}


// Utilities: normalize & edit distance
function norm(s){ return String(s||'').toLowerCase().replace(/[\p{P}\p{S}]/gu,' ').replace(/\s+/g,' ').trim(); }
function editDistance(a,b){ const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(0)); for(let i=0;i<=m;i++)dp[i][0]=i; for(let j=0;j<=n;j++)dp[0][j]=j; for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){ const c=a[i-1]===b[j-1]?0:1; dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+c);} return dp[m][n]; }


// KB: expanded
const KB = [
{tag:'greet', patterns:[/^(hi|hello|hey|yo)\b/i], responses:['Hey! ${emoji}','Hello — ready to tinker? ${emoji}','Hi there! What are we building today? ${emoji}']},
{tag:'name_set', patterns:[/(?:i am|i'm|my name is)\s+([a-z\-\s']{2,})/i], responses:['Nice to meet you, ${name}!','Got it — I\'ll call you ${name}. ${emoji}'], onMatch:(m)=>{ state.memory.name = capWords(m[1]); save(); }},
{tag:'ask_name', patterns:[/who are you\b/i, /what('?| i)s your name\b/i], responses:['I\'m ${self}, an offline chat brain. ${emoji}','${self} here — all client-side.']},
{tag:'time', patterns:[/\b(time|what time)\b/i], responses:[()=>`Your device says ${new Date().toLocaleTimeString()}. ${pickEmoji()}`]},
{tag:'date', patterns:[/\b(today|date|what day)\b/i], responses:[()=>`It\'s ${new Date().toLocaleDateString()}. ${pickEmoji()}`]},
{tag:'like', patterns:[/i like\s+([a-z0-9\-\s']{2,})/i], responses:['Nice — I added ${topic} to your likes. ${emoji}','${topic}? Got it. Noted in memory.'], onMatch:(m)=>{ const t=capWords(m[1]); if(!state.memory.likes.includes(t)) state.memory.likes.push(t); save(); }},
{tag:'deploy', patterns:[/github pages|deploy on github|deploy on github pages/i], responses:['Push an index.html to the repo (username.github.io), or enable Pages from branch in Settings → Pages. Need a checklist?']},
{tag:'html_help', patterns:[/\b(html|css|javascript|js)\b/i], responses:['Web tip: kee
