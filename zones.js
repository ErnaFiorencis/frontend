var place = ""
var zoneImage = new Image()

const zoneBackground = new Sprite ({
    position : {
        x:0,
        y:0
    },
    image: zoneImage,
})

let zoneAnimationID



function chooseZone(symbol){
    canvas.style.backgroundColor = 'rgba(104,87,70,255)'
    canvas.width = 1174//0.80 * window.innerWidth//1074 //1024
    canvas.height = 600
    if(window.innerWidth > 1174){
        canvas.width = 0.98 * window.innerWidth
        
    }
    if(window.innerHeight > 600){
        canvas.height = 0.97 * window.innerHeight
    }

    console.log(symbol)
    symbol = symbol
    if(symbol == 113){
        console.log("pekara")
        zoneImage.src = './img/pozadina.png'
        zoneImage.style.width = '100px'
        zoneImage.style.height = '100px'
        place = "bakery"
        animateZone()
    }
    else if(symbol == 182){
        console.log("farma")
        zoneImage.src = './img/pozadina.png'
        zoneImage.style.width = '100px'
        zoneImage.style.height = '100px'
        place = "bakery"
        animateZone()
    }
    else if(symbol == 1000){
        console.log("pošta")
        zoneImage.src = './img/pozadina.png'
        zoneImage.style.width = '100px'
        zoneImage.style.height = '100px'
        place = "bakery"
        animateZone()
    }

    else{
        zoneImage.src = './img/rabbit.png'
        window.location.href = "achievements.html"
    }
    
    
}

function animateZone(){
    zoneAnimationId = window.requestAnimationFrame(animateZone)
   
    zoneBackground.draw()
}

let numberOfQuestions = 0
let question_data


function getQuestions(){
    numberOfQuestions += 1
    document.getElementById("resultBox").style.display = "none"

    console.log("dohvacam pitanja i postvaljam ih")
    const category = localStorage.getItem("category")
    fetch("http://localhost:3000/api/v1/questions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({category, place})
    }).then((res) => res.json()).then(data => {
        console.log("HHH#H")
        console.log(data[0])
        question_data = data[0]
        document.getElementById("question-text").innerHTML = data[0]["question_text"]
        let answers = data[0]["answer_options"].split('-')
        console.log(answers)
        document.getElementById("answ1").innerHTML = answers[0]
        document.getElementById("answ2").innerHTML = answers[1]
        document.getElementById("answ3").innerHTML = answers[2]
        document.getElementById("answ4").innerHTML = answers[3]
    })}
    document.getElementById("start").addEventListener('click', ()=>{
    getQuestions()
    document.getElementById("startBox").style.display = "none"
    document.getElementById("choseAnswer").style.display = "grid"
    document.getElementById("question").style.display = "block"
    document.getElementById("border").style.display = "block"


})

document.getElementById("nextQuestion").addEventListener('click', () =>{
    if(numberOfQuestions <= 5){
        getQuestions()
    }
    else{
        console.log("gototvo")
        document.getElementById("endBox").style.display = "block"
    }
})
async function is_touch_enabled() {
    try{
        document.createEvent("TouchEvent")
        return true
    }
    catch(e) {
        return false
    }
}
is_touch_enabled().then(e => {
    if(e){
document.getElementById("up").style.display  ="flex"
document.getElementById("down").style.display  ="flex"
document.getElementById("left").style.display  ="flex"
document.getElementById("right").style.display  ="flex"
    }})
function closeZone(){
    is_touch_enabled().then(e => {
        if(e){
    document.getElementById("up").style.display  ="flex"
    document.getElementById("down").style.display  ="flex"
    document.getElementById("left").style.display  ="flex"
    document.getElementById("right").style.display  ="flex"
        }})
    document.getElementById("startBox").style.display = "none"
    document.getElementById("choseAnswer").style.display = "none"
    document.getElementById("question").style.display = "none"
    document.getElementById("border").style.display = "none"
    document.getElementById("startBox").style.display = "none"
    document.getElementById("cancle").style.display = "none"
    document.getElementById("endBox").style.display = "none"

    document.getElementById("homeicon").style.display = "block"
    document.getElementById("seticon").style.display = "block"
    document.getElementById("soundicon").style.display = "block"
            document.getElementById("infoicon").style.display = "block"
    cancelAnimationFrame(zoneAnimationID)
    numberOfQuestions = 0
    z.initiated = false
    z.recently = 100
    console.log(canvas.width)
    canvas.width = 0.80 * window.innerWidth//1074 //1024
    canvas.height = 0.96* window.innerHeight//580 //576
    console.log("TUUUU")
    console.log(canvas.width)
    animate()
}

document.getElementById("cancle").addEventListener('click', () =>{
    closeZone()
})
document.getElementById("cancle").addEventListener('touchstart', () =>{
    //keys.space.pressed = false
    closeZone()
    
}, false)
document.getElementById("end").addEventListener('click', () =>{
    closeZone()
})

function evaluateAnswer(answer){
    console.log("evaluiram odgovor")
    console.log(question_data)
    let corect = false
    console.log(answer)
    console.log(question_data["correct_answer"])
    if(answer == question_data["correct_answer"]){
        corect = true
    }
    document.getElementById("resultBox").style.display = 'block'
    if(corect){
        document.getElementById("answerResult").innerHTML = "Bravo! Tocan odgovor"
        if(localStorage.getItem("user")){
            user = localStorage.getItem("user")
            let points = 0
            let t
            if(question_data["difficulty_level"] == 1){
                points = 2
                t = "Ostvario si 2 boda"
            }
            else if (question_data["difficulty_level"] == 2){
                points = 5
                t = "Ostvario si 5 bodova"
            }
            else{
                points = 10
                t = "Ostvario si 10 bodova"
            }

            document.getElementById("answerInfo").innerHTML = t
            fetch("http://localhost:3000/api/v1/achivments/", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("user")
                },
                body: JSON.stringify({points})
            })
            let category = question_data["category"]
            fetch("http://localhost:3000/api/v1/achivments/update", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("user")
                },
                body: JSON.stringify({category})
            }).then((res) => res.json()).then((data) =>{
                if(data.length > 0){
                    alert("Čestitam! Ostvario si postignuće: " + data[0]["achievement_name"])
                }
            })
        }
        else{
            document.getElementById("answerInfo").innerHTML = "Prijavi se kako bi sakupljao bodove"
        }



    }
    else{
        document.getElementById("answerResult").innerHTML = "Netocan odgovor"
        document.getElementById("answerInfo").innerHTML = "Tocan odgovor je: " + question_data["correct_answer"]
    }
    
}

document.querySelectorAll('button.ques').forEach((button) => {
    button.addEventListener('click', () =>{
        console.log("HHH#H")
        console.log(button.innerHTML)
        evaluateAnswer(button.innerHTML)
    })
})


