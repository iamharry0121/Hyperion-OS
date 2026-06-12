let startX;
let startY;
let currentX;
let currentY;
let activeWindow = null;
let highestZIndex = 10;
let osWindow;
let taskbar;
let fullscreened = false

function toggleWindow(e) {
    let osWindow;
    
    if (e.target.dataset.app) {
        let appName = e.target.dataset.app;
        osWindow = document.querySelector('.os-window[data-window-type="' + appName + '"]'); //hunts down the hidden window by matching its data attribute string
    } else {
        osWindow = e.target.closest('.os-window'); //fallback for when u click inside the window header to hide it
    }
    
    if (!osWindow) return; //stops function immediately if click happened outside a shortcut or window

    highestZIndex++; //boosts the layer counter by 1
    osWindow.style.zIndex = highestZIndex; //forces the toggled window straight to the front layer

    // Check if it's empty OR if it's set to 'none'
    if (osWindow.style.display === '' || osWindow.style.display === 'none') {
        osWindow.style.display = 'flex'; //basically js unhides the window
    } else {
        osWindow.style.display = 'none'; //hides the window
    }
}

function dragStart(e) {
    if (e.target.tagName === 'BUTTON') {
            return; 
        }

    activeWindow = e.target.closest('.os-window');

    if (activeWindow == null) {
        return;
    }

    highestZIndex++; //boosts the layer counter by 1
    activeWindow.style.zIndex = highestZIndex; //forces the dragged window straight to the front layer

    startX = e.clientX //gets starting x
    startY = e.clientY //gets starting y
    document.addEventListener('mousemove', dragMove) //event listener for the dragging
    document.addEventListener('mouseup', dragEnd) //event listener for when u take lift ur mouse button
}

function dragMove(e) {
    let dx = startX-e.clientX //calcs distance between starting and where mouse is on x axis
    let dy = startY-e.clientY //calcs distance between starting and where mouse is on y axis
    startX = e.clientX //updates the new startx AFTER the change above
    startY = e.clientY //updates the new starty AFTER the change above
    
    if (activeWindow){
        //shifts the window horizontally by subtracting the mouse's X movement and adding 'px'
        activeWindow.style.left = (activeWindow.offsetLeft - dx) + 'px';
        //shifts the window vertically by subtracting the mouse's Y movement and adding 'px'
        activeWindow.style.top = (activeWindow.offsetTop - dy) + 'px';
    }
}

function dragEnd() {
    //stops listening for the mouse move after the user places the window down
    document.removeEventListener('mousemove', dragMove); 
    //stops listening for the mouse up after the user places the window down
    document.removeEventListener('mouseup', dragEnd);
    activeWindow = null;
}

function xOut(e) {
    osWindow = e.target.closest('.os-window');
    if (osWindow) {
        osWindow.style.display = 'none';
        
        // true close: optional reset to center layout position
        osWindow.style.left = '10%';
        osWindow.style.top = '10%';
    }
}

function fullscreenToggle(e) {
    osWindow = e.target.closest('.os-window');
    taskbar = document.querySelector('.taskbar')

    if (fullscreened == false) {
        osWindow.style.width = '100vw'
        osWindow.style.height = 'calc(100vh - 47px)';
        osWindow.style.top = '0'
        osWindow.style.left = '0'
        fullscreened = true
    } else {
        osWindow.style.width = '400px' 
        osWindow.style.height = '300px'
        fullscreened = false
    }
}

// listens for any mouse click on the webpage to manage window overlapping depth
document.addEventListener('mousedown', function(e) {
    let clickedWindow = e.target.closest('.os-window'); // checks if the clicked item is inside an app window
    
    if (clickedWindow) {
        highestZIndex++; // boosts the layer counter by 1
        clickedWindow.style.zIndex = highestZIndex; // forces the clicked window straight to the front layer
    }
});