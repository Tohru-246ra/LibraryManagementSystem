const user_menu = document.getElementById("user-menu");
let login_user = document.getElementById("login-user");
const element_login_user_icon = document.getElementById("login-user-icon");
const element = document.getElementById("user-menu-container");

user_menu.addEventListener('click',() => {    
    element.style.display = "block";
});

addEventListener('click',(e) => {
    if (e.target != element && e.target != user_menu && e.target != login_user && e.target != element_login_user_icon) {
        element.style.display = "none";
    }
})