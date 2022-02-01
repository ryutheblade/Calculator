const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const result = document.querySelector('.result');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const flips = document.querySelectorAll('.flip')

let dis1Num = '';
let dis2Num = '';
let results = null;
let lastOperation = '';
let haveDecimal = false;
let isNegative = false;


numbers.forEach(num => {
    num.addEventListener('click', (e)=> {
        if(e.target.innerText === '.' && !haveDecimal){
            haveDecimal = true;
        }else if(e.target.innerText === '.' && haveDecimal){
            return;
        }
        dis2Num += e.target.innerText;
        display2.innerText = dis2Num;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (e)=> {
        if(!dis2Num) result;
        haveDecimal = false;
        const operatorName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation) {
            mathOperation();
        }else{
            results = parseFloat(dis2Num);
        }
        clearVar(operatorName);
        lastOperation = operatorName;
    })
})

flips.forEach(flip => {
    flip.addEventListener('click', (e) => {
        if(display2.innerText !== '-' && !isNegative){
            isNegative = true;
            dis2Num = '-' + display2.innerText;
            display2.innerText = dis2Num;
        }else{
            isNegative = false;
            tempString = display2.innerText;
            dis2Num = tempString.replace('-', '');
            display2.innerText = dis2Num;
        }
    })
})

function clearVar(name = '') {
    dis1Num += dis2Num + ' ' + name + ' ';
    display1.innerText = dis1Num;
    display2.innerText = '';
    dis2Num = '';
    result.innerText = results;
}

function mathOperation() {
    if(lastOperation === 'X') {
        results = parseFloat(results) * parseFloat(dis2Num);
    } else if(lastOperation === '+') {
        results = parseFloat(results) + parseFloat(dis2Num);
    } else if(lastOperation === '-') {
        results = parseFloat(results) - parseFloat(dis2Num);
    } else if(lastOperation === '/') {
        results = parseFloat(results) / parseFloat(dis2Num);
    } else if(lastOperation === '%') {
        results = parseFloat(results) / 100;
    }
}

equal.addEventListener('click', (e) => {
    if(!dis1Num || !dis2Num) result;
    haveDecimal = false;
    mathOperation();
    clearVar();
    display2.innerText = results;
    result.innerText = '';
    dis2Num = results;
    dis1Num = '';
})

clear.addEventListener('click', (e) => {
    display1.innerText = '0';
    display2.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    results = '0';
    result.innerText = '';
})

window.addEventListener('keyup', (e) => {
    if(
        e.key === '0'||
        e.key === '1'||
        e.key === '2'||
        e.key === '3'||
        e.key === '4'||
        e.key === '5'||
        e.key === '6'||
        e.key === '7'||
        e.key === '8'||
        e.key === '9'||
        e.key === '.'
    ){
        clickButton(e.key);
    }else if(
        e.key === '/' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%' 
    ){
        clickOperator(e.key);
    }else if(e.key === '*') {
        clickOperator('X')
    }else if(e.key === 'Enter' || e.key === '=') {
        clickEqual();
    }
});

function clickButton(key){
    numbers.forEach( btn => {
        if(btn.innerText === key) {
            btn.click();
        }
    })
}

function clickOperator(key){
    operators.forEach(btn => {
        if(btn.innerText === key) {
            btn.click();
        }
    })
}

function clickEqual() {
    equal.click();
}