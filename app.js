const desktop = document.getElementById('desktop');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
const taskbarApps = document.getElementById('taskbar-apps');
const clock = document.getElementById('clock');

// Update clock every second
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}
setInterval(updateClock, 1000);
updateClock();

// Toggle start menu
startBtn.addEventListener('click', () => {
  startMenu.classList.toggle('hidden');
});

// Open apps from desktop or start menu
document.querySelectorAll('[data-app]').forEach(el => {
  el.addEventListener('dblclick', () => openApp(el.dataset.app));
  el.addEventListener('click', () => {
    if (el.classList.contains('menu-item')) {
      openApp(el.dataset.app);
      startMenu.classList.add('hidden');
    }
  });
});

function openApp(app) {
  const template = document.getElementById('window-template');
  const win = template.content.cloneNode(true).children[0];
  const title = win.querySelector('.title');
  const content = win.querySelector('.content');

  if (app === 'notepad') {
    title.textContent = 'Notepad';
    content.innerHTML = '<textarea style="width:100%;height:100%"></textarea>';
  }
  if (app === 'browser') {
    title.textContent = 'Browser';
    content.innerHTML = '<iframe src="https://example.com" style="width:100%;height:100%"></iframe>';
  }

  // Make window draggable
  let offsetX, offsetY, isDown = false;
  const bar = win.querySelector('.title-bar');
  bar.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });
  document.addEventListener('mousemove', e => {
    if (isDown) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });
  document.addEventListener('mouseup', () => isDown = false);

  // Close button
  win.querySelector('.close').addEventListener('click', () => {
    win.remove();
  });

  // Add to desktop
  win.style.top = '100px';
  win.style.left = '100px';
  desktop.appendChild(win);
}
