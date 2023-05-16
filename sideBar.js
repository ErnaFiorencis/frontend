

function closeSideBar(){
    document.getElementById("linkHome").style.color= "rgb(187, 241, 225)"
    document.getElementById("sideBar").style.backgroundColor = "black"
    document.getElementById("sideBarBox").style.display = "none"
    document.getElementById("sideBarButton").innerHTML = "OTVORI"

}

function openSideBar(){
    if(localStorage.getItem("category") == undefined){
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Loop through the checkboxes and uncheck them
        checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        });
        localStorage.setItem("category", '{"z":["1","2","3"],"o":["1","2","3"],"m":["1","2","3"],"d":["1","2","3"],"r":["1","2","3"],"p":["1","2","3"],"g":["1","2","3"]}')
    }
    document.getElementById("sideBar").style.backgroundColor = "white"
    document.getElementById("sideBarBox").style.display = "block"
    document.getElementById("linkHome").style.color= "black"
    document.getElementById("sideBarButton").innerHTML = "ZATVORI"
}

document.getElementById("sideBarButton").addEventListener("click", () =>{
    if(document.getElementById("sideBarButton").innerHTML === "OTVORI"){
        openSideBar()


        if(localStorage.getItem("user")){
            fetch("http://localhost:3000/api/v1/students/name/" + localStorage.getItem("user"), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
            .then((data => {
                console.log(data[0])
                document.getElementById("username").innerHTML = "user: " + (data[0]["user_name"]).toUpperCase()
                let level = Math.floor(((Math.sqrt(1 + 8 * parseInt(data[0]["points"]) / 100)) - 1) / 2) + 1
                console.log(level)
                document.getElementById("level").innerHTML = "LEVEL: " + level
                console.log(100 * (level)*(level - 1) / 2)
                document.getElementById("progres").value = parseInt(data[0]["points"])  - 100 * (level)*(level - 1) / 2
                document.getElementById("progres").max = level * 100
                let cat = data[0]["category"]
                console.log(cat)
    
                Object.keys(cat).forEach((i) => {
                    console.log(cat[i])
                    cat[i].forEach(element => {
                        document.getElementById(i + element).checked = true
                    });
                });

                localStorage.setItem("category",JSON.stringify(cat))

            }))            
        }
        if(localStorage.getItem("category")){
            let c = JSON.parse(localStorage.getItem("category"))
            
            Object.keys(c).forEach((i) => {
                console.log(c[i])
                c[i].forEach(element => {
                    document.getElementById(i + element).checked = true
                });
            });
        }

    }
    else{
        closeSideBar()
    }
    if(localStorage.getItem("user")){
        document.getElementById("userInfo").style.display = "block"    
    }
})

document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear()
    document.getElementById("userInfo").style.display = "none" 
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Loop through the checkboxes and uncheck them
    checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    });
    localStorage.setItem("category", '{"z":["1","2","3"],"o":["1","2","3"],"m":["1","2","3"],"d":["1","2","3"],"r":["1","2","3"],"p":["1","2","3"],"g":["1","2","3"]}')
    closeSideBar()
})

document.getElementById("submitTypes").addEventListener("click", () => {
    category= {"z":[], "o":[], "m":[], "d":[], "r":[], "p":[], "g":[]}
    let l = ["z", "o", "m", "d", "r", "p","g"]
    l.forEach(el => {
        document.querySelectorAll('input[name='+ el + ']').forEach(element => {
            if(element.checked){
                (category[el]).push(element.value)
            }
        })
    });
    console.log(category)
    category = JSON.stringify(category)
    localStorage.setItem("category", category)
    if(localStorage.getItem("user")){
        user = localStorage.getItem("user")
        fetch("http://localhost:3000/api/v1/students/category/proba", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user, category})
        })
    }
})
let l = ["z", "o", "m", "d", "r", "p", "g"]
l.forEach(el => {    document.getElementById(el).addEventListener("click", () => {
    console.log("HEJJ")
    console.log(document.querySelectorAll('input[name='+ el + ']'))
    let c = false
    document.querySelectorAll('input[name='+ el + ']').forEach(element => {
        if(element.checked){
            c = true
        }
    });
    if(c){
        document.querySelectorAll('input[name='+ el + ']').forEach(element => {element.checked = false});
    }
    else{
        document.querySelectorAll('input[name='+ el + ']').forEach(element => {element.checked = true});
    }
})})

