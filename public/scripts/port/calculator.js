
  let calcHead;
  let calcPrevDisp;
  let calcMainDisp;
  let firstNum = true;
  let inputListAll = [];
  let inputListNum = [];
  let inputListArith = [];
  let floatTrue = false;
  let total;
  let tempTotal;
  let afterEqual = false;
  let digitMax = false;
  let calculatorData = {name: 'Calculator'}

  //Button Assigns
  let clearButton;
  let divideButton;
  let multiplyButton;
  let subtractButton;
  let additionButton;

  function buildCalc(){
    const calcTop = document.createElement('div');
    calcTop.id = "calcHead";
    app.appendChild(calcTop);

    const calcPrevDispl = document.createElement('p');
    calcPrevDispl.id = "calcPrevDisp";
    calcPrevDispl.innerHTML = "";
    calcTop.appendChild(calcPrevDispl);

    const calcMainDispl = document.createElement('input');
    calcMainDispl.id = "calcMainDisp";
    calcMainDispl.value = "0";
    calcTop.appendChild(calcMainDispl);

    const keypad = document.createElement('div');
    keypad.id = "calcPad";
    app.appendChild(keypad);

    const clearB = document.createElement('button');
    clearB.id = 'clearButton';
    clearB.innerHTML = "C";
    keypad.appendChild(clearB);

    const decimalB = document.createElement('button');
    decimalB.id = "decimalButton";
    decimalB.innerHTML = ".";
    keypad.appendChild(decimalB);

    const divideB = document.createElement('button');
    divideB.id = 'divideButton';
    divideB.innerHTML = "&#247";
    keypad.appendChild(divideB);



    function multipleButton(num1, num2){
      for(var i = num1; i <= num2; i++){
        const numButt = document.createElement('button');
        numButt.id = "num" + i + 'Button';
        numButt.value = i;
        numButt.innerHTML = i;
        numButt.addEventListener('click', numToMainDisp);
        keypad.appendChild(numButt);
      }
    }

    multipleButton(7,9);

    const multiplyB = document.createElement('button');
    multiplyB.id = "multiplyButton";
    multiplyB.innerHTML = "&times";
    keypad.appendChild(multiplyB);



    multipleButton(4,6);

    const subtractB = document.createElement('button');
    subtractB.id = 'subtractButton';
    subtractB.innerHTML = "-";
    keypad.appendChild(subtractB);

    multipleButton(1,3);

    const additionB = document.createElement('button');
    additionB.id = 'additionButton';
    additionB.innerHTML = '+';
    keypad.appendChild(additionB);

    multipleButton(0,0);

    const equalsB = document.createElement('button');
    equalsB.id = "equalsButton";
    equalsB.innerHTML = "=";
    keypad.appendChild(equalsB);
  }

  function idAssign(){
    calcHead = document.getElementById('calcHead');
    calcPrevDisp = document.getElementById('calcPrevDisp');
    calcMainDisp = document.getElementById('calcMainDisp');
    clearButton = document.getElementById('clearButton');
    divideButton = document.getElementById('divideButton');
    multiplyButton = document.getElementById('multiplyButton');
    subtractButton = document.getElementById('subtractButton');
    additionButton = document.getElementById('additionButton');
  }

  function numToMainDisp(num){
    if(!afterEqual){
      if(!isNaN(num)){
        calcMainDisp.value += num;
      }
      else{
        if(firstNum == true){
          calcMainDisp.value = '';
          firstNum = false;
        }
        calcMainDisp.value += num.srcElement.value;
      }
    }
    if(calcMainDisp.value.length > 13){
      digitMax = true;
      clearFunc();
    }
  }

  //Arithmetic Functions

  function arithmeticFunction(symbol){
    if(calcMainDisp.value != ''){
      inputListAll.push(parseFloat(calcMainDisp.value));
      inputListNum.push(parseFloat(calcMainDisp.value));
    }
    else{
      inputListAll.push(0);
      inputListNum.push(0);
    }
    inputListAll.push(symbol);
    inputListArith.push(symbol);
    calcMainDisp.value = 0;
    firstNum = true;
    floatTrue = false;
    afterEqual = false;
    calcPrevDisp.innerHTML = inputListAll.join(' ');
  }

  function additionFunc(){
    arithmeticFunction('+');
  }

  function subtractFunc(){
    arithmeticFunction('-');
  }

  function multiplyFunc(){
    arithmeticFunction('&times');
  }

  function divideFunc(){
    arithmeticFunction('&#247');
  }

  //End Arithmetic Functions

  //Decimal Place Function

  function decimalFunc(){
    if(firstNum == true){
      calcMainDisp.value = '';
      firstNum = false;
    }
    calcMainDisp.value += '.';
    floatTrue = true;
  }

  //End Decimal Place function

  //Utility Functions

  function clearFunc(){
    firstNum = true;
    inputListAll = [];
    inputListNum = [];
    inputListArith = [];
    floatTrue = false;
    total = undefined;
    tempTotal;
    afterEqual = false;
    calcMainDisp.value = 0;
    calcPrevDisp.innerHTML = '';
    if(digitMax == true){
      calcPrevDisp.innerHTML = 'Max Digit Reached';
    }
    digitMax = false;
  }

  var calculations = function(operator, num1, num2){
    if(operator == '+'){
      tempTotal = num1 + num2;

    }
    else if(operator == '-'){
      tempTotal = num1 - num2;
    }
    else if(operator == '&times'){
      tempTotal = num1 * num2;
    }
    else if(operator == '&#247'){
      tempTotal = num1 / num2;
    }
    inputListNum.shift();
    inputListNum[0] = tempTotal;
  }

  function equalsFunc(){

    if(calcMainDisp.value != ''){
      inputListAll.push(parseFloat(calcMainDisp.value));
      inputListNum.push(parseFloat(calcMainDisp.value));
    }
    else{
      inputListAll.push(parseFloat(0));
      inputListNum.push(parseFloat(0));
    }
    calcMainDisp.value = '';

    for(var i = 0; i < inputListArith.length; i++){
      calculations(inputListArith[i], inputListNum[0], inputListNum[1]);
    }

    if(inputListNum[0] % Math.round(inputListNum[0]) !== 0){
      let tempNum = (Math.round(inputListNum[0]*10000)/10000).toFixed(4).toString().split('');
      let endNum = true;
      for(i = 0; i < tempNum.length; i++){
        if(tempNum[i] == '.'){
          for(var j = tempNum.length-1; j > i; j--){
            if((tempNum[j] == '0' && endNum) && tempNum.length < 1){
              
              tempNum.pop();
              if(j == i+1){
                tempNum[i].pop();
                inputListNum[0] = parseFloat(tempNum.join(''));
              }
            }
            else{
              endNum = false;
              inputListNum[0] = parseFloat(tempNum.join(''));
            }
          }
        }
      }
    }

    calcMainDisp.value = inputListNum[0];

    afterEqual = true;
    inputListNum.shift();
    inputListArith = [];
    inputListAll = [];
    calcPrevDisp.innerHTML = '';

    if(calcMainDisp.value.length > 13){
      digitMax = true;
      clearFunc();
    }
  }

  //End Utility Functions

  function control(event){
    
    if(event.key !== 'F5') {
        event.preventDefault();
    }
    if(firstNum == true){
      calcMainDisp.value = '';
      firstNum = false;
    }
    if(!isNaN(parseInt(event.key)) && afterEqual == false ){
      numToMainDisp(event.key);
    }
    else if(event.key == '+'){
      additionFunc();
    }
    else if(event.key == '-'){
      subtractFunc();
    }
    else if(event.key == '*'){
      multiplyFunc();
    }
    else if(event.key == '/'){
      divideFunc();
    }
    else if(event.key == '.'){
      decimalFunc();
    }
    else if(event.key == 'c' || event.key == 'Delete' || event.key == 'Backspace'){
      clearFunc();
    }
    else if(event.key == '=' || event.key == "Enter"){
      equalsFunc();
    }
    if(calcMainDisp.value == '') {
      console.log('dont wanna be here')
      calcMainDisp.value = '0'
      firstNum = true;
    }
  }

 (function init(){
   buildCalc();
   idAssign();
   document.body.addEventListener('keydown', control);
   additionButton.addEventListener('click', additionFunc);
   subtractButton.addEventListener('click', subtractFunc);
   multiplyButton.addEventListener('click', multiplyFunc);
   divideButton.addEventListener('click', divideFunc);
   decimalButton.addEventListener('click', decimalFunc);
   clearButton.addEventListener('click', clearFunc);
   equalsButton.addEventListener('click', equalsFunc);
   document.querySelector('#calcMainDisp').disabled="disabled";
 })();
