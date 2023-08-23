let b = document.body
const changebgred = () => {
    document.body.firstElementChild.style.background = "red"
}
console.log("First Child of B is: " + b.firstChild)
console.log("First Element Child of B is: " + b.firstElementChild)