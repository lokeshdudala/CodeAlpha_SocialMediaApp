if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

const userId =
    localStorage.getItem("userId");

const POSTS_API =
    "https://socialhub-backend-3mdp.onrender.com/api/posts";

const USER_API =
    "https://socialhub-backend-3mdp.onrender.com/api/auth";

async function loadProfile() {

    try {

        const response =
            await fetch(
                `${USER_API}/user/${userId}`
            );

        const user =
            await response.json();

        const container =
            document.getElementById(
                "profile-container"
            );

        container.innerHTML = `
            <div class="profile-card">

                <img
                    src="${user.profilePic}"
                    alt="Profile"
                    class="profile-pic"
                >

                <h2>${user.name}</h2>

                <p class="profile-email">
                    ${user.email}
                </p>

                <p class="profile-bio">
                    ${user.bio}
                </p>

                <div class="stats">

                    <div>
                        <h3>${user.followers.length}</h3>
                        <p>Followers</p>
                    </div>

                    <div>
                        <h3>${user.following.length}</h3>
                        <p>Following</p>
                    </div>

                </div>

            </div>
        `;

        document.getElementById(
            "editName"
        ).value = user.name;

        document.getElementById(
            "editBio"
        ).value = user.bio;

        document.getElementById(
            "editProfilePic"
        ).value = user.profilePic;

        loadMyPosts();

    } catch (error) {

        console.log(error);
    }
}

async function loadMyPosts() {

    try {

        const response =
            await fetch(POSTS_API);

        const posts =
            await response.json();

        const myPosts =
            posts.filter(
                post => post.user._id === userId
            );

        const container =
            document.getElementById(
                "my-posts"
            );

        container.innerHTML = `
            <h3>
                📷 Total Posts:
                ${myPosts.length}
            </h3>
        `;

        myPosts.forEach(post => {

            container.innerHTML += `
                <div class="post-card">

                    <p>
                        ${post.content}
                    </p>

                    <p>
                        ❤️ ${post.likes.length} Likes
                    </p>

                </div>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

const editForm =
document.getElementById(
    "editProfileForm"
);

if (editForm) {

    editForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const name =
                document.getElementById(
                    "editName"
                ).value;

            const bio =
                document.getElementById(
                    "editBio"
                ).value;

            const profilePic =
                document.getElementById(
                    "editProfilePic"
                ).value;

            try {

                const response =
                    await fetch(
                        `${USER_API}/user/${userId}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                "application/json"
                            },

                            body: JSON.stringify({
                                name,
                                bio,
                                profilePic
                            })
                        }
                    );

                const data =
                    await response.json();

                alert(data.message);

                loadProfile();

            } catch (error) {

                console.log(error);
            }
        }
    );
}

loadProfile();