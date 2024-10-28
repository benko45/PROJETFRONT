function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if(username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Utilisateur enregistré avec succès");
        window.location.href = "login.html";
    } else {
        alert("Veuillez remplir tous les champs");
    }   
}