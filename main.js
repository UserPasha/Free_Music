const buttonPrev = document.getElementById("previous")
const buttonNext = document.getElementById("next")
const header = document.getElementById("header")
const images = []
images.push('./images/pinkBg.jpg')
images.push('./images/purpleBG.jpg')
let currentImageIndex = 0

const onClickButtonPrev = () => {
    currentImageIndex++
    if (currentImageIndex === 2 || currentImageIndex === -1) {
        currentImageIndex = 0
    }
    header.style.backgroundImage = `url(${images[currentImageIndex]})`
}

setInterval(onClickButtonPrev, 5000)

header.style.backgroundImage = `url(${images[currentImageIndex]})`
buttonPrev.addEventListener("click", onClickButtonPrev);
buttonNext.addEventListener("click", onClickButtonPrev);

const formSection = document.getElementById("formSection")
const formButton = document.getElementById("buttonForm")
const closeIcon = document.getElementById("closeIcon")

formButton.onclick = function(e){
    e.preventDefault()
    formSection.classList.add('active')
}
closeIcon.onclick = function(){
    formSection.classList.remove('active')
}


//const form = document.getElementById("form")
// const form = document.forms["form"]
// const name = document.getElementById("name")
// const email = document.getElementById("email")
// const phone = document.getElementById("phone")
// const message = document.getElementById("message")
// const action = form.action
//
// const onSubmit =  (e) => {
//     e.preventDefault()
//     const payload = {
//
//             Name: name.value,
//             Email: email.value,
//             Phone: phone.value,
//             Message: message.value
//
//     };
//     console.log(payload)
//     fetch('send_mail.php', {
//         method: 'POST',
//         body:  payload
//     })
//         .then(response => console.log(response))
//       //  .catch(onError)
//
// }
//
//
// form.addEventListener("submit", onSubmit)

const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validFormArr.push(el);
    }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.style.border = "2px solid rgb(0, 196, 0)";
    } else {
        el.setAttribute("is-valid", "0");
        el.style.border = "2px solid rgb(255, 0, 0)";
    }
}

function formCheck(e) {
    e.preventDefault();
    const allValid = [];
    validFormArr.forEach((el) => {
        allValid.push(el.getAttribute("is-valid"));
    });
    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });
    if (!Boolean(Number(isAllValid))) {
        alert("Заполните поля правильно!");
        return;
    }
    formSubmit();
}

async function formSubmit() {
    const data = serializeForm(form);
    const response = await sendData(data);
    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formReset();
    } else {
        alert("Код ошибки: " + response.status);
    }
}

function serializeForm(formNode) {
    return new FormData(form);
}

async function sendData(data) {
    return await fetch("send_mail.php", {
        method: "POST",
        body: data,
    });
}

function formReset() {
    form.reset();
    validFormArr.forEach((el) => {
        el.setAttribute("is-valid", 0);
        el.style.border = "none";
    });
}
