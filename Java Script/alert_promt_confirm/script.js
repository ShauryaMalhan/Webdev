alert("Hello Your Script Works!")
let a = prompt("Enter a: ", "567")
a = Number.parseInt(a);
alert("You entered a of type: " + (typeof a))
let write = confirm("Do you want to write it in the page: ")
if(write){
    document.write(a)
}