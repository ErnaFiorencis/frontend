



function adding(){
    fetch("http://localhost:3000/api/v1/achivments/" + localStorage.getItem("user"), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
