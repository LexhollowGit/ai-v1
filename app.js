const desktop = document.getElementById('desktop');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
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
    content.innerHTML = '<textarea></textarea>';
  }
  if (app === 'browser') {
    title.textContent = 'Browser';
    content.innerHTML = '<iframe src="https://example.com"></iframe>';
  }

  // Dragging
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

  // Window controls
  const closeBtn = win.querySelector('.close');
  const minimizeBtn = win.querySelector('.minimize');
  const maximizeBtn = win.querySelector('.maximize');

  closeBtn.addEventListener('click', () => win.remove());

  minimizeBtn.addEventListener('click', () => {
    win.style.display = 'none';
    // Restore when clicking taskbar icon later (can be extended)
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

  // Add resizers
  addResizers(win);

  // Default position
  win.style.top = '100px';
  win.style.left = '100px';
  win.style.width = '400px';
  win.style.height = '300px';
  desktop.appendChild(win);
}

// Add resizing functionality
function addResizers(win) {
  const resizers = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
  resizers.forEach(dir => {
    const div = document.createElement('div');
    div.classList.add('resizer', dir);
    win.appendChild(div);

    let isResizing = false;
    div.addEventListener('mousedown', e => {
      e.preventDefault();
      isResizing = true;
      let prevX = e.clientX;
      let prevY = e.clientY;

      const onMouseMove = e => {
        if (!isResizing) return;

        const rect = win.getBoundingClientRect();
        if (dir.includes('e')) {
          win.style.width = rect.width + (e.clientX - prevX) + "px";
        }
        if (dir.includes('s')) {
          win.style.height = rect.height + (e.clientY - prevY) + "px";
        }
        if (dir.includes('w')) {
          win.style.width = rect.width - (e.clientX - prevX) + "px";
          win.style.left = rect.left + (e.clientX - prevX) + "px";
        }
        if (dir.includes('n')) {
          win.style.height = rect.height - (e.clientY - prevY) + "px";
          win.style.top = rect.top + (e.clientY - prevY) + "px";
        }
        prevX = e.clientX;
        prevY = e.clientY;
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
}
