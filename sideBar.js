async function is_touch_enabled() {
    try{
        document.createEvent("TouchEvent")
        return true
    }
    catch(e) {
        return false
    }
}

function logout(){
    localStorage.clear()
    document.getElementById("userInfo").style.display = "none" 
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Loop through the checkboxes and uncheck them
    checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    });
    localStorage.setItem("category", '{"z":["1","2","3"],"o":["1","2","3"],"m":["1","2","3"],"d":["1","2","3"],"r":["1","2","3"],"p":["1","2","3"],"g":["1","2","3"]}')
    closeSideBar()
}


function closeSideBar(){
    document.getElementById("up").style.right = '15'
    document.getElementById("right").style.right = '75'
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

    document.getElementById("up").style.right = '195'
    document.getElementById("right").style.right = '260'
}



document.getElementById("seticon").addEventListener("click", () =>{
    if(document.getElementById("sideBar").style.display == "none"){
        document.getElementById("sideBar").style.display = "block"
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
                document.getElementById("username").innerHTML = "ime: " + (data[0]["user_name"]).toUpperCase()
                let level = Math.floor(((Math.sqrt(1 + 8 * parseInt(data[0]["points"]) / 100)) - 1) / 2) + 1
                console.log(level)
                document.getElementById("level").innerHTML = "LEVEL: " + level
                console.log(100 * (level)*(level - 1) / 2)
                document.getElementById("progres").value = parseInt(data[0]["points"])  - 100 * (level)*(level - 1) / 2
                document.getElementById("progres").max = level * 100
                let cat = data[0]["category"]
                console.log(cat)
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            // Loop through the checkboxes and uncheck them
                checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                });
                Object.keys(cat).forEach((i) => 
                {
    
                    console.log(cat[i])
                    cat[i].forEach(element => {
                        document.getElementById(i + element).checked = true
                    });
                });

                localStorage.setItem("category",JSON.stringify(cat))
            })
        }
             
        if(localStorage.getItem("category")){
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            // Loop through the checkboxes and uncheck them
                checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                });
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
        document.getElementById("sideBar").style.display = "none"
    }
    if(localStorage.getItem("user")){
        document.getElementById("userInfo").style.display = "block"    
    }
})

document.getElementById("logout").addEventListener("click", () => {
    logout()
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
        fetch("http://localhost:3000/api/v1/students/category/proba", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("user")
            },
            body: JSON.stringify({category})
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

