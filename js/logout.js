const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.clear();

            window.location.href =
                "login.html";
        }
    );
}