
document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault()
    user_name = document.getElementById("username").value
    password = document.getElementById("password").value
    email = document.getElementById("email").value

    fetch("http://localhost:3000/api/v1/students/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ user_name, password, email })
    }).then((res) => {
        if(res.status != 201){
            alert("Vec postoji korisnik s tim imenom molim probajte neko drugo")
        }
        else{
            alert("Uspjesno si se registrirao, prijavi se sa novo napravljnim racunom")
            window.location.href = "login.html";
        }
    })
})