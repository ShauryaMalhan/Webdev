function createBox() {
    const boxContainer = document.getElementById('box-container');
    const newBox = document.createElement('div');
    newBox.className = 'box';
    boxContainer.appendChild(newBox);
}

// Add click event listener to the button
const createBoxButton = document.getElementById('create-box-button');
createBoxButton.addEventListener('click', createBox);