let startX;
let startY;
let currentX;
let currentY;
let activeWindow;


function toggleWindow() {
    let osWindow = document.querySelector('.os-window'); //finds first html element w/ that name and selects it

    // Check if it's empty OR if it's set to 'none'
    if (osWindow.style.display === '' || osWindow.style.display === 'none') {
        osWindow.style.display = 'block'; //basically js unhides the window
    } else {
        osWindow.style.display = 'none'; //hides the window
    }
}

function dragStart(e) {
    activeWindow = e.target.closest('.os-window');
    startX = e.clientX //gets starting x
    startY = e.clientY //gets starting y
    document.addEventListener('mousemove', dragMove) //event listener for the dragging
    document.addEventListener('mouseup', dragEnd) //event listener for when u take lift ur mouse button
}

function dragMove(e) {
    dx = startX-e.clientX //calcs distance between starting and where mouse is on x axis
    dy = startY-e.clientY //calcs distance between starting and where mouse is on y axis
    startX = e.clientX //updates the new startx AFTER the change above
    startY = e.clientY //updates the new starty AFTER the change above
    
    if (activeWindow){
        //shifts the window horizontally by subtracting the mouse's X movement and adding 'px'
        osWindow.style.left = (osWindow.offsetLeft - dx) + 'px';
        //shifts the window vertically by subtracting the mouse's Y movement and adding 'px'
        osWindow.style.top = (osWindow.offsetTop - dy) + 'px';
    }
}

function dragEnd() {
    //stops listening for the mouse move after the user places the window down
    document.removeEventListener('mousemove', dragMove); 
    //stops listening for the mouse up after the user places the window down
    document.removeEventListener('mouseup', dragEnd);
}