console.log(document)
console.log(document.body)
let flag = confirm("Do you want to change: ")
if(flag){
    document.body.style.background = "yellow"
}