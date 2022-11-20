let passwordLengthValue = 16;
const passwordInput = document.getElementById("password");
const upperCaseCheck = document.getElementById('uppercase-check')
const numberCheck = document.getElementById('number-check')
const symbolCheck = document.getElementById('symbol-check')
const securityIndicatorBar = document.getElementById('security-indicator-bar')



function generatePassword() {
    let chars =
    "abcdefghjkmnpqrstuvwxyz";

    const upperCaseChars = 'ABCDEFGHJKMNPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolChars = '?!@&*()[]'


    if(upperCaseCheck.checked){
        chars += upperCaseChars 
    }
    
    if(numberCheck.checked){
        chars += numberChars 
    }
    

    if(symbolCheck.checked){
        chars += symbolChars
    }
    

    let password = "";
    let passwordCountChar = document.getElementById("password-length-text")

    for (let i = 0; i < passwordLengthValue; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    passwordInput.value = password;
    passwordCountChar.innerText = password.length
    calculateQuality()
    calculateFontSize()

}

generatePassword();

const passwordLength = document.getElementById("password-length");
passwordLength.addEventListener("input", function () {
    passwordLengthValue = passwordLength.value;
    generatePassword();
});

function calculateFontSize() {
    if(passwordLengthValue > 45 ){
        passwordInput.classList.remove('font-sm')
        passwordInput.classList.remove('font-xs')
        passwordInput.classList.add('font-xxs')
    }else if(passwordLengthValue > 32){
        passwordInput.classList.remove('font-xxs')
        passwordInput.classList.remove('font-sm')
        passwordInput.classList.add('font-xs')
    }else if(passwordLengthValue > 22){
        passwordInput.classList.remove('font-xs')
        passwordInput.classList.remove('font-xxs')
        passwordInput.classList.add('font-sm')
    }else{
        passwordInput.classList.remove('font-xs')
        passwordInput.classList.remove('font-xxs')
        passwordInput.classList.remove('font-sm')
    }
}

function copyPassword() {
    navigator.clipboard.writeText(passwordInput.value);
    let alertCopy = document.querySelector('.alert-copy')
    alertCopy.classList.add('active')
    setTimeout(function(){
        alertCopy.classList.remove('active')
    }, 2000)
}

function calculateQuality() {
    //tamanho*0.25peso + maiusculas*0.15peso + numeros*0.25peso + simbolos*0.35peso = 100%

    const percent = Math.round(
        (passwordLengthValue / 64 ) * 25 +
        (upperCaseCheck.checked ? 15 : 0) + 
        (numberCheck.checked ? 25 : 0) + 
        (symbolCheck.checked ? 35 : 0)
        )

    securityIndicatorBar.style.width = `${percent}%`

    percent == 100 ? securityIndicatorBar.classList.add('completed') : securityIndicatorBar.classList.remove('completed')
    

    if(percent <= 40){
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.add("critical")
    }else if(percent >= 70){
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.remove("critical")
        securityIndicatorBar.classList.add("safe")
    }else{
        securityIndicatorBar.classList.remove("critical")
        securityIndicatorBar.classList.remove("safe")
        securityIndicatorBar.classList.add('warning')
    }
}

const copyButton = document.querySelectorAll(".copy");

copyButton.forEach(btn => {
    btn.addEventListener("click", copyPassword);
})


upperCaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)