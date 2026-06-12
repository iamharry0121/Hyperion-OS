// --- GLOBAL STRUCTURAL CONSTANTS ---
let startX, startY; 
let activeWindow = null;
let highestZIndex = 10;
let fullscreened = false;
let virtualDrive = []; 

// --- WINDOW MANAGEMENT (OPEN/CLOSE/TOGGLE) ---
function toggleWindow(e) {
    let osWindow;
    
    if (e.target.dataset.app) {
        let appName = e.target.dataset.app;
        osWindow = document.querySelector('.os-window[data-window-type="' + appName + '"]');
    } else {
        osWindow = e.target.closest('.os-window');
    }
    
    if (!osWindow) return; 

    highestZIndex++; 
    osWindow.style.zIndex = highestZIndex; 

    if (osWindow.style.display === '' || osWindow.style.display === 'none') {
        osWindow.style.display = 'flex'; 
    } else {
        osWindow.style.display = 'none'; 
    }
}

function xOut(e) {
    let osWindow = e.target.closest('.os-window');
    if (osWindow) {
        osWindow.style.display = 'none'; 
        osWindow.style.left = '15%';     
        osWindow.style.top = '15%';
    }
}

function fullscreenToggle(e) {
    let osWindow = e.target.closest('.os-window');
    if (!osWindow) return;

    if (!fullscreened) {
        osWindow.style.width = '100vw';
        osWindow.style.height = 'calc(100vh - 48px)'; 
        osWindow.style.top = '0';
        osWindow.style.left = '0';
        fullscreened = true;
    } else {
        osWindow.style.width = '450px'; 
        osWindow.style.height = '350px';
        fullscreened = false;
    }
}

// --- CANVAS ELEMENT MOVING LOGIC ---
function dragStart(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return; 

    activeWindow = e.target.closest('.os-window');
    if (!activeWindow) return;

    highestZIndex++; 
    activeWindow.style.zIndex = highestZIndex; 

    startX = e.clientX;
    startY = e.clientY;
    
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

// --- CALCULATE WINDOW COORDINATES ---
function dragMove(e) {
    if (!activeWindow) return;

    let dx = startX - e.clientX;
    let dy = startY - e.clientY;
    
    startX = e.clientX;
    startY = e.clientY;
    
    activeWindow.style.left = (activeWindow.offsetLeft - dx) + 'px';
    activeWindow.style.top = (activeWindow.offsetTop - dy) + 'px';
}

function dragEnd() {
    document.removeEventListener('mousemove', dragMove); 
    document.removeEventListener('mouseup', dragEnd);
    activeWindow = null;
}

// --- FILE DRIVE STACK ---
function handleFileUpload(e) {
    let file = e.target.files[0]; 
    if (!file) return;

    let fileData = {
        name: file.name,
        type: file.type,
        rawRef: file 
    };

    virtualDrive.push(fileData); 
    renderFileList();            
}

function renderFileList() {
    let fileListContainer = document.getElementById('file-list');
    if (!fileListContainer) return; 
    
    fileListContainer.innerHTML = ''; 

    virtualDrive.forEach(function(file, index) {
        let iconHtml = `
            <div class="file-icon-wrapper" onclick="openFile(${index})" style="display: inline-block; margin: 10px; text-align: center; cursor: pointer; width: 70px;">
                <div style="font-size: 32px; color: var(--text-color); margin-bottom:4px;"><i class="fa-solid fa-file-lines"></i></div>
                <div style="font-size: 11px; word-break: break-all; color: var(--text-color); font-family: monospace;">${file.name}</div>
            </div>
        `;
        fileListContainer.innerHTML += iconHtml;
    });
}

function openFile(index) {
    let targetFile = virtualDrive[index];
    
    if (targetFile.type === "text/plain" || targetFile.name.endsWith('.txt')) {
        let reader = new FileReader(); 
        
        reader.onload = function(e) {
            let textField = document.getElementById('notes-textarea');
            let notesWindow = document.querySelector('.os-window[data-window-type="text-editor"]');
            
            if (textField) textField.value = e.target.result; 
            
            if (notesWindow) {
                notesWindow.style.display = 'flex'; 
                highestZIndex++; 
                notesWindow.style.zIndex = highestZIndex; 
            }
        };
        
        reader.readAsText(targetFile.rawRef); 
    } else {
        alert("HyperionOS can only open text (.txt) files right now!");
    }
}

// --- DEDICATED MASTER DESIGN INTERFACE TOGGLE ---
function setInterfaceMode(mode) {
    let root = document.documentElement;
    
    if (mode === 'dark') {
        // Switch variables to dark translucent frost properties
        root.style.setProperty('--window-bg', 'rgba(15, 15, 15, 0.6)');
        root.style.setProperty('--window-border', 'rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--header-bg', 'rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--input-bg', 'rgba(30, 30, 30, 0.5)');
    } else {
        // Fall back to clean light translucent frost properties
        root.style.setProperty('--window-bg', 'rgba(255, 255, 255, 0.45)');
        root.style.setProperty('--window-border', 'rgba(255, 255, 255, 0.6)');
        root.style.setProperty('--text-color', '#1a2a3a');
        root.style.setProperty('--header-bg', 'rgba(255, 255, 255, 0.4)');
        root.style.setProperty('--input-bg', 'rgba(255, 255, 255, 0.5)');
    }
}

// --- RUNNING TIME SYNC ---
function updateClock() {
    let now = new Date();
    let timeEl = document.getElementById('clock-time');
    let dateEl = document.getElementById('clock-date');
    if (!timeEl || !dateEl) return;

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0'); 
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    timeEl.textContent = hours + ':' + minutes + ' ' + ampm;

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateEl.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
}

updateClock();
setInterval(updateClock, 1000);