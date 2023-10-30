const Slider = document.querySelector("[data-slider-length]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const passwordLength = document.querySelector("[data-passwordlength]");
const copymsg = document.querySelector("[data-copymsg]");
const copyData = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const passwordStrength = document.querySelector("[data-strength]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbols = "~!@#$%^&*()-_=+[]\{}|;':,./<>?";

let password = "";
let SliderVal = 10;
let checkcount = 1;
handleSlider();

setPasswordStrength("#ccc");


function handleSlider(){
    Slider.value = SliderVal;
    passwordLength.innerText=Slider.value;
    let min = Slider.min;
    let max = Slider.max;
    let len = passwordLength.innerText-'0';

    Slider.style.backgroundSize = ((len-min)*100/max-min) + "% 100%";
}

function setPasswordStrength(color){
    passwordStrength.style.backgroundColor =  color;
    passwordStrength.style.boxShadow = '0px 0px 12px 1px';
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRndNumber(){
    return getRndInteger(0,9);
}

function getRndLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function getRndUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function getRndSymbol(){
      let index = getRndInteger(0,symbols.length);
      return symbols.charAt(index); 
}

function shufflePassword(array){

    console.log(array);
    
    let i = array.length;
    while (--i > 0) {
       let temp = Math.floor(Math.random() * (i + 1));
       [array[temp], array[i]] = [array[i], array[temp]];
    }
    
    let str = "";
    array.forEach(elem => str+=elem);
    return str;
}

function calcPasswordStrength(){
    let hasupper = false;
    let haslower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasupper=true;
    if(lowercaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasupper && haslower && (hasSymbol || hasNumber) && passwordLength.innerText-'0'>=8){
        setPasswordStrength("#0f0");
    }else if(hasupper && haslower  && passwordLength.innerText-'0'>=6){
        setPasswordStrength("#ff0");
    }else{
        setPasswordStrength("#f00");
    }
}

async function copyContent(){
      
    try{
             await navigator.clipboard.writeText(passwordDisplay.value);
             copymsg.innerText="Copied";
    }catch(e){
        copymsg.innerText="Failed";
    }

    copymsg.classList.add("active");

    setTimeout(() =>{
        copymsg.classList.remove ("active");
    },2000)

     
}

Slider.addEventListener("input",(e) =>{
    SliderVal = e.target.value;
    handleSlider();
});

copyData.addEventListener('click',() =>{
    if(passwordDisplay.value){
        copyContent();
    }
});

allCheckBox.forEach(checkbox =>{
    checkbox.addEventListener('change',handleBoxClick);
});

function handleBoxClick(){
    checkcount=0;
    allCheckBox.forEach(checkbox =>{
         if(checkbox.checked){
            checkcount++;
         }
    });
    if(Slider.value<checkcount){
        SliderVal=checkcount;
        handleSlider();
    }
}

generateBtn.addEventListener('click',() =>{
       if(checkcount===0) return;

       if(passwordLength<checkcount){
           SliderVal=checkcount;
           handleSlider();
       }
       let password="";
       let funcArr = [];

       if(uppercaseCheck.checked){
                password+=getRndUppercase();
                funcArr.push(getRndUppercase);
       } 

       if(lowercaseCheck.checked){
               password+=getRndLowercase();
               funcArr.push(getRndLowercase);
       } 

       if(numberCheck.checked){
                 password+=getRndNumber();
                 funcArr.push(getRndNumber);
       }

       if(symbolCheck.checked){
                 password+=getRndSymbol();
                 funcArr.push(getRndSymbol);
       } 
       let len = passwordLength.innerText -'0';
       console.log(checkcount);
       for(var i=0;i<len-checkcount;i++){
               let temp = getRndInteger(0,funcArr.length);
               console.log(temp);
               password+=funcArr[temp]();
       }

       //shuffle the password
       password = shufflePassword(Array.from(password));
       passwordDisplay.value = password;
       calcPasswordStrength(password);


});
