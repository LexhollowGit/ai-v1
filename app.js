const desktop = document.getElementById('desktop');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
const clock = document.getElementById('clock');

// Clock
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}
setInterval(updateClock,1000); updateClock();

// Start menu toggle
startBtn.addEventListener('click',()=>startMenu.classList.toggle('hidden'));

// Desktop icons & start menu apps
document.querySelectorAll('[data-app]').forEach(el=>{
  el.addEventListener('dblclick',()=>openApp(el.dataset.app));
  el.addEventListener('click',()=>{
    if(el.classList.contains('menu-item')||el.classList.contains('tile')){
      openApp(el.dataset.app);
      startMenu.classList.add('hidden');
    }
  });
});

function openApp(app){
  const template=document.getElementById('window-template');
  const win=template.content.cloneNode(true).children[0];
  const title=win.querySelector('.title');
  const content=win.querySelector('.content');

  if(app==='notepad'){
    title.textContent='Notepad';
    content.innerHTML=`<textarea style="width:100%;height:100%;"></textarea>`;
  }
  else if(app==='browser'){
    title.textContent='Browser';
    content.innerHTML=`
      <div style="display:flex;flex-direction:column;height:100%;">
        <div class="browser-bar">
          <input id="browser-url" type="text" placeholder="Search or enter URL">
          <button id="browser-go">Go</button>
        </div>
        <iframe id="browser-frame" src="https://www.google.com"></iframe>
      </div>
    `;
    const goBtn=content.querySelector('#browser-go');
    const urlInput=content.querySelector('#browser-url');
    const iframe=content.querySelector('#browser-frame');
    function loadPage(){
      let q=urlInput.value.trim();
      if(!q) return;
      if(q.startsWith('http://')||q.startsWith('https://')) iframe.src=q;
      else if(q.includes('.')) iframe.src='https://'+q;
      else iframe.src='https://www.google.com/search?q='+encodeURIComponent(q);
    }
    goBtn.addEventListener('
