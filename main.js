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

header.style.backgroundImage = `url(${images[currentImageIndex]})`
buttonPrev.addEventListener("click", onClickButtonPrev);
buttonNext.addEventListener("click", onClickButtonPrev);

const formSection = document.getElementById("formSection")
const formButton = document.getElementById("buttonForm")

formButton.onclick = function(e){
    e.preventDefault()
    formSection.classList.add('active')
}

const form = document.forms["form"]
const formArr = Array.from(form)
const button = form.elements["button"]


const serializeForm=(formNode)=>{
    return new FormData(form)

}
const sendData = async(data)=>{
    return await fetch('send_mail.php', {
        method: "POST",
        body: data,
    })
}
const formReset=()=>{
    form.reset()
}
const formSubmit = async() =>{
    const data = serializeForm(form)
    const response = await sendData(data)
    console.log("Данные отправляются...")
    if(response.ok){
        let result = await response.json()
        alert(result.message)
        formReset()
    } else {
        alert("Код ошибки: " + response.status)
    }
}
const sendMail = () => {
    debugger
formSubmit();
formSection.classList.remove('active')
}
form.addEventListener("submit", sendMail)

