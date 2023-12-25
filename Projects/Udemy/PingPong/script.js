const but1 = document.getElementById('p1button');
const but2 = document.getElementById('p2button');
const p1 = document.getElementById('p1display');
const p2 = document.getElementById('p2display');
const reset = document.getElementById('reset');
const playto = document.getElementById('playto');

let p1score = 0;
let p2score = 0;
let winningscore = 3;

reset1 = (e) => {
    p1score = 0;
    p2score = 0;
    p1.innerText = p1score;
    p2.innerText = p2score;
    p1.classList.remove('green', 'red');
    p2.classList.remove('green', 'red');
    but1.disabled = false;
    but2.disabled = false;
}

but1.addEventListener('click', (e) =>{
    if(p1score !== winningscore && p2score !== winningscore){
        p1score++;
        p1.innerText = p1score;
        if(p1score === winningscore){
            p1.classList.add('green'); 
            p2.classList.add('red');
            but1.disabled = true;
            but2.disabled = true;
        }
    }
});

but2.addEventListener('click', (e) =>{
    if(p2score !== winningscore && p1score !== winningscore){
        p2score++;
        p2.innerText = p2score;
        if(p2score === winningscore){
            p2.classList.add('green');
            p1.classList.add('red');
            but1.disabled = true;
            but2.disabled = true;
        }
    }
});

playto.addEventListener('change', (e) =>{
    winningscore = parseInt(playto.value);
    reset1();
})

reset.addEventListener('click', reset1);

