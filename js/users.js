if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

const currentUserId =
    localStorage.getItem("userId");

const API_URL =
    "http://localhost:5000/api/auth/users";

async function loadUsers() {

    try {

        const response =
            await fetch(API_URL);

        const users =
            await response.json();

        const container =
            document.getElementById(
                "users-container"
            );

        container.innerHTML = "";

        users.forEach(user => {

            if (user._id === currentUserId) {
                return;
            }

            container.innerHTML += `
               <div class="user-card">

                    <h3>
                        ${user.name}
                    </h3>

                    <p>
                        ${user.email}
                    </p>

                    <p>
                        Followers:
                        ${user.followers.length}
                    </p>

                    <button
                        onclick="followUser('${user._id}')">
                        Follow
                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

async function followUser(targetUserId) {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/auth/follow",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        currentUserId,
                        targetUserId
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        loadUsers();

    } catch (error) {

        console.log(error);
    }
}

loadUsers();