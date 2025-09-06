// 📂 Open App
function openApp(app) {
  const template = document.getElementById('window-template');
  const win = template.content.cloneNode(true).children[0];
  const title = win.querySelector('.title');
  const content = win.querySelector('.content');

  if (app === 'notepad') {
    title.textContent = 'Notepad';
    content.innerHTML = `<textarea style="width:100%;height:100%;"></textarea>`;
  }
  else if (app === 'browser') {
    title.textContent = 'Browser';
    content.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;">
        <div style="padding:5px;background:#eee;display:flex;gap:5px;">
          <input id="browser-url" type="text" placeholder="Search or enter URL" style="flex:1;padding:5px;">
          <button id="browser-go">Go</button>
        </div>
        <iframe id="browser-frame" src="https://www.google.com" style="flex:1;border:none;"></iframe>
      </div>
    `;

    // Elements
    const goBtn = content.querySelector('#browser-go');
    const urlInput = content.querySelector('#browser-url');
    const iframe = content.querySelector('#browser-frame');

    function loadPage() {
      let query = urlInput.value.trim();
      if (!query) return;

      if (query.startsWith('http://') || query.startsWith('https://')) {
        iframe.src = query;
      }
      else if (query.includes('.')) {
        iframe.src = "https://" + query;
      }
      else {
        iframe.src = "https://www.google.com/search?q=" + encodeURIComponent(query);
      }
    }

    goBtn.addEventListener('click', loadPage);
    urlInput.addEventListener('keydown', e => {
      if (e.key === "Enter") loadPage();
    });
  }
  else if (app === 'explorer') {
    title.textContent = 'File Explorer';
    content.innerHTML = `<div style="padding:10px;">📁 File Explorer (mock version)</div>`;
  }
  else if (app === 'settings') {
    title.textContent = 'Settings';
    content.innerHTML = `<div style="padding:10px;">⚙️ Settings Panel (mock version)</div>`;
  }
  else {
    title.textContent = app;
    content.innerHTML = `<div style="padding:10px;">🚧 App under construction</div>`;
  }

  // 🖱️ Dragging
  let offsetX, offsetY, isDown = false;
  const bar = win.querySelector('.title-bar');
  bar.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = Date.now();
  });
  document.addEventListener('mousemove', e => {
    if (isDown) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });
  document.addEventListener('mouseup', () => isDown = false);

  // 🖥️ Window controls
  const closeBtn = win.querySelector('.close');
  const minimizeBtn = win.querySelector('.minimize');
  const maximizeBtn = win.querySelector('.maximize');

  closeBtn.addEventListener('click', () => win.remove());

  minimizeBtn.addEventListener('click', () => {
    win.style.display = 'none';
  });

  let isMaximized = false;
  let prevState = {};
  maximizeBtn.addEventListener('click', () => {
    if (!isMaximized) {
      prevState = {
        top: win.style.top,
        left: win.style.left,
        width: win.style.width,
        height: win.style.height
      };
      win.style.top = "0px";
      win.style.left = "0px";
      win.style.width = "100%";
      win.style.height = "calc(100% - 40px)";
      isMaximized = true;
    } else {
      win.style.top = prevState.top;
      win.style.left = prevState.left;
      win.style.width = prevState.width;
      win.style.height = prevState.height;
      isMaximized = false;
    }
  });

  // 🖱️ Add resizers
  addResizers(win);

  // Default position
  win.style.top = '100px';
  win.style.left = '100px';
  win.style.width = '500px';
  win.style.height = '350px';
  desktop.appendChild(win);
}
