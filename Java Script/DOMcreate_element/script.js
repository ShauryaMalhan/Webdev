
// Get the div and button elements by their IDs
let targetDiv = document.getElementById('targetDiv');
let replaceButton = document.getElementById('replaceButton');

// Function to replace the content of the div
function replaceContent() {
    let newText = 'Aayush is adding new content';
    targetDiv.innerHTML = newText;
}

// Add a click event listener to the button
replaceButton.addEventListener('click', replaceContent);