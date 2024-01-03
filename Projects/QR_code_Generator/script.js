var button = document.getElementById('QR');
var input = document.getElementById('input1');
var qr = document.getElementById('qr');

let tt = '';

input.addEventListener('input', ()=>{
    tt = input.value;
})

button.addEventListener('click', () => {
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${tt}`
})