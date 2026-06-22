const API_URL =
"https://socialhub-backend-3mdp.onrender.com/api/auth";

// Register

const registerForm =
document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const name =
            document.getElementById("name").value;

            const email =
            document.getElementById("email").value;

            const password =
            document.getElementById("password").value;

            try{

                const response =
                await fetch(
                    "https://socialhub-backend-3mdp.onrender.com/api/auth/register",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );

                const data =
                await response.json();

                alert(data.message);

                if(response.ok){

                    window.location.href =
                    "login.html";
                }

            }catch(error){

                console.log(error);

                alert("Registration Failed");
            }
        }
    );
}

// Login

const loginForm =
document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const email =
            document.getElementById("loginEmail").value;

            const password =
            document.getElementById("loginPassword").value;

            try{

                const response =
                await fetch(
                    "https://socialhub-backend-3mdp.onrender.com/api/auth/login",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const data =
                await response.json();

                if(response.ok){

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    localStorage.setItem(
                        "userId",
                        data.userId
                    );

                    alert("Login Successful");

                    window.location.href =
                    "feed.html";

                }else{

                    alert(data.message);
                }

            }catch(error){

                console.log(error);

                alert("Login Failed");
            }
        }
    );
}