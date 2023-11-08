async function login(email, password) {
    const url = 'http://localhost:5678/api/users/login';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.status === 200) {
            // Connexion réussie
            const data = await response.json();
            const userId = data.userId;
            const token = data.token;
            
            // Stocker le token dans le localStorage pour une utilisation ultérieure
            localStorage.setItem('token', token);

           
            alert('Connexion réussie!');
            window.location.href = 'index.html'; // Redirection vers la page d'accueil
        } else if (response.status === 401) {
            // Erreur d'authentification
            alert('Identifiant ou mot de passe incorrect.');
        } else if (response.status === 404) {
            // Utilisateur non trouvé
            const errorData = await response.json();
            alert(errorData.message);
        } else {
            // Gérer d'autres codes d'erreur ici
            alert('Une erreur s\'est produite lors de la connexion.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        throw new Error('Une erreur s\'est produite lors de la connexion.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById("loginForm");

    formLogin.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        login(email, password); 
    });
});