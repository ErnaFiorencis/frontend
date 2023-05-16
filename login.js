
document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("hej")
    username = document.getElementById("username").value
    password = document.getElementById("password").value

    fetch("http://localhost:3000/api/v1/students/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ username, password })
    }).then((res) => {
        if(res.status != 200){
            alert("Pogresno ime ili lozinka")
            document.getElementById("username").value = ""
            document.getElementById("password").value = ""
        }
        else{
            localStorage.setItem("user", username)
            fetch("http://localhost:3000/api/v1/students/name/" + localStorage.getItem("user"), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json()).then((data => {
                localStorage.setItem("category",JSON.stringify(data[0]["category"]))
            }))
            window.location.href = "index.html";
        }
    })
})