const desktop = document.getElementById('desktop');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
const clock = document.getElementById('clock');

// 🕒 Clock update
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// 🪟 Toggle Start Menu
startBtn.addEventListener('click', () => startMenu.classList.toggle('hidden'));

// Open apps from desktop or start menu
document.querySelectorAll('[data-app]').forEach(el => {
  el.addEventListener('dblclick', () => openApp(el.dataset.app));
  el.addEventListener('click', () => {
    if(el.classList.contains('menu-item') || el.classList.contains('tile')){
      openApp(el.dataset.app);
      startMenu.classList.add('hidden');
    }
  });
});

// 📂 Open App Function
function openApp(app){
  const template = document.getElementById('window-template');
  const win = template.content.cloneNode(true).children[0];
  const title = win.querySelector('.title');
  const content = win.querySelector('.content');

  // --- App content ---
  if(app === 'notepad'){
    title.textContent = 'Notepad';
    content.innerHTML = `<textarea style="width:100%;height:100%;"></textarea>`;
  } else if(app === 'browser'){
    title.textContent = 'Browser';
    content.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;">
        <div class="browser-bar">
          <input id="browser-url" type="text" placeholder="Search or enter URL">
          <button id="browser-go">Go</button>
        </div>
        <iframe id="browser-frame" src="https://www.google.com"></iframe>
      </div>
    `;
    const goBtn = content.querySelector('#browser-go');
    const urlInput = content.querySelector('#browser-url');
    const iframe = content.querySelector('#browser-frame');

    function loadPage(){
      let query = urlInput.value.trim();
      if(!query) return;

      const urlPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?].*)?$/;
      if(urlPattern.test(query)){
        if(!query.startsWith('http://') && !query.startsWith('https://')) query = 'https://' + query;

        const safeSites = ['wikipedia.org','example.com'];
        const domain = query.replace(/^https?:\/\//,'').split('/')[0];
        if(safeSites.some(site => domain.includes(site))){
          iframe.src = query;
        } else {
          window.open(query,'_blank');
        }
      } else {
        iframe.src = 'https://www.google.com/search?q=' + encodeURIComponent(query);
      }
    }

    goBtn.addEventListener('click', loadPage);
    urlInput.addEventListener('keydown', e => { if(e.key === 'Enter') loadPage(); });
  } else if(app === 'explorer'){
    title.textContent = 'File Explorer';
    content.innerHTML = `<div style="padding:10px;">📁 File Explorer (mock version)</div>`;
  } else if(app === 'settings'){
    title.textContent = 'Settings';
    content.innerHTML = `<div style="padding:10px;">⚙️ Settings Panel (mock version)</div>`;
  } else {
    title.textContent = app;
    content.innerHTML = `<div style="padding:10px;">🚧 App under construction</div>`;
  }

  // --- Dragging ---
  let isDown = false, offsetX, offsetY;
  const bar = win.querySelector('.title-bar');
  bar.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = Date.now();
  });
  document.addEventListener('mousemove', e => {
    if(isDown){
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });
  document.addEventListener('mouseup', () => isDown = false);

  // --- Window Controls ---
  const closeBtn = win.querySelector('.close');
  const minimizeBtn = win.querySelector('.minimize');
  const maximizeBtn = win.querySelector('.maximize');

  closeBtn.addEventListener('click', () => win.remove());
  minimizeBtn.addEventListener('click', () => win.style.display = 'none');

  let isMaximized = false;
  let prevState = {};
  maximizeBtn.addEventListener('click', () => {
    if(!isMaximized){
      prevState = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height };
      win.style.top = '0px';
      win.style.left = '0px';
      win.style.width = '100%';
      win.style.height = 'calc(100% - 40px)';
      isMaximized = true;
    } else {
      win.style.top = prevState.top;
      win.style.left = prevState.left;
      win.style.width = prevState.width;
      win.style.height = prevState.height;
      isMaximized = false;
    }
  });

  // --- Resizers ---
  addResizers(win);

  // --- Default position ---
  win.style.top = '100px';
  win.style.left = '100px';
  win.style.width = '500px';
  win.style.height = '350px';
  desktop.appendChild(win);
}

// --- Resizing Function ---
function addResizers(win){
  const dirs = ['nw','ne','sw','se','n','s','e','w'];
  dirs.forEach(dir => {
    const div = document.createElement('div');
    div.classList.add('resizer', dir);
    win.appendChild(div);

    let isResizing = false;
    div.addEventListener('mousedown', e => {
      e.preventDefault();
      isResizing = true;
      let prevX = e.clientX, prevY = e.clientY;

      const onMouseMove = e => {
        if(!isResizing) return;
        const rect = win.getBoundingClientRect();
        if(dir.includes('e')) win.style.width = rect.width + (e.clientX - prevX) + 'px';
        if(dir.includes('s')) win.style.height = rect.height + (e.clientY - prevY) + 'px';
        if(dir.includes('w')) { win.style.width = rect.width - (e.clientX - prevX) + 'px'; win.style.left = rect.left + (e.clientX - prevX) + 'px'; }
        if(dir.includes('n')) { win.style.height = rect.height - (e.clientY - prevY) + 'px'; win.style.top = rect.top + (e.clientY - prevY) + 'px'; }
        prevX = e.clientX; prevY = e.clientY;
      };

      const onMouseUp = () => { 
        isResizing=false; 
        document.removeEventListener('mousemove', onMouseMove); 
        document.removeEventListener('mouseup', onMouseUp); 
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
}
