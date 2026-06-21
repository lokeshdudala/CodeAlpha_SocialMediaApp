if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

const API_URL =
"http://localhost:5000/api/posts";

async function loadPosts() {

    try {

        const response =
            await fetch(API_URL);

        const posts =
            await response.json();

        const container =
            document.getElementById(
                "posts-container"
            );

        container.innerHTML = "";

        posts.forEach(post => {

            container.innerHTML += `
                <div class="post-card">

                    <h3>
                        ${post.user.name}
                    </h3>

                    <p>
                        ${post.content}
                    </p>

                    <p>
                        ❤️ ${post.likes.length} Likes
                    </p>

                    <button
                        onclick="likePost('${post._id}')">
                          ❤️
                    </button>

                    <br><br>

                    <input
                        type="text"
                        id="comment-${post._id}"
                        placeholder="Write a comment..."
                    >

                    <button
                        onclick="addComment('${post._id}')">
                        Comment
                    </button>

                    <div
                        id="comments-${post._id}">
                    </div>

                    <br>

                    <small>
                        ${new Date(
                            post.createdAt
                        ).toLocaleString()}
                    </small>

                </div>
            `;

            setTimeout(() => {
                loadComments(post._id);
            }, 100);

        });

    } catch (error) {

        console.log(error);
    }
}

const postForm =
document.getElementById("postForm");

if (postForm) {

    postForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const content =
                document.getElementById(
                    "content"
                ).value;

            const user =
                localStorage.getItem(
                    "userId"
                );

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                            "application/json"
                        },

                        body: JSON.stringify({
                            user,
                            content
                        })
                    }
                );

            const data =
                await response.json();

            alert(data.message);

            postForm.reset();

            loadPosts();
        }
    );
}

async function likePost(postId) {

    const userId =
        localStorage.getItem("userId");

    await fetch(
        "http://localhost:5000/api/posts/like",
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                postId,
                userId
            })
        }
    );

    loadPosts();
}

async function addComment(postId) {

    const text =
        document.getElementById(
            `comment-${postId}`
        ).value;

    const user =
        localStorage.getItem("userId");

    if (!text) {
        alert("Enter Comment");
        return;
    }

    const response =
        await fetch(
            "http://localhost:5000/api/comments",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    post: postId,
                    user,
                    text
                })
            }
        );

    const data =
        await response.json();

    alert(data.message);

    document.getElementById(
        `comment-${postId}`
    ).value = "";

    loadComments(postId);
}

async function loadComments(postId) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/comments/${postId}`
            );

        const comments =
            await response.json();

        const container =
            document.getElementById(
                `comments-${postId}`
            );

        if (!container) return;

        container.innerHTML = "";

        comments.forEach(comment => {

            container.innerHTML += `
                <p>
                    <b>${comment.user.name}</b> :
                    ${comment.text}
                </p>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

loadPosts();