



function adding(){
    fetch("http://localhost:3000/api/v1/achivments/" + '1', {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("user")
        }
    }).then(res => res.json()).then(data =>{
        console.log(data)
        data.forEach(element => {
            var div = document.createElement("div")
            var p = document.createElement("p")
            p.innerHTML = element["achievement_name"]
            var img = document.createElement("img")
            img.setAttribute("src", "./img/medalje/" + element["achievement_category"] + element["achivment_level"]+ ".png");

            div.appendChild(img)
            div.appendChild(p)
            div.style.textAlign = "center"
            var imageContainer = document.getElementById("achContainer");
            imageContainer.appendChild(div);
            
        });
    })

}

if(localStorage.getItem("user")){
    adding()
}
if(localStorage.getItem("user")){
    fetch("http://localhost:3000/api/v1/students/name", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("user")
        }
    }).then((res) => {
        if(res.status != 200){
            alert("Tvoja sesija je istekla, nastavi neulogiran ili se ponovno prijavu")
            logout()
        }
        else{
            return res.json()
        }
    }).then(data => {
        console.log(data[0])
        document.getElementById("user").innerHTML = "ime: " + (data[0]["user_name"]).toUpperCase()
        document.getElementById("points").innerHTML = "bodovi: " + data[0]["points"]
        let level = Math.floor(((Math.sqrt(1 + 8 * parseInt(data[0]["points"]) / 100)) - 1) / 2) + 1
        console.log(level)
        document.getElementById("level").innerHTML = "level: " + level
        
    })
}
