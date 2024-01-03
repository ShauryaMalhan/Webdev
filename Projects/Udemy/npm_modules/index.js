import { franc } from 'franc';
import langs from 'langs';
import colors from 'colors';
const a = process.argv.slice(2).join(' ');
let input = franc(a);
console.log(input);
if(input === 'und'){
    console.log(("Noooo thats wrong").red);
}else{
    console.log(langs.where("3", input).name.green);
}

