function toggleWindow() {
    let osWindow = document.querySelector('.os-window');

    // Check if it's empty OR if it's set to 'none'
    if (osWindow.style.display === '' || osWindow.style.display === 'none') {
        osWindow.style.display = 'block';
    } else {
        osWindow.style.display = 'none';
    }
}