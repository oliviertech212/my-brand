// javascript for mobile menuicon
window.addEventListener("load", () => {
  document.getElementById("mainmenu").style.display = "none";
});

function mobilemenu() {
  if (document.getElementById("mainmenu").style.display === "block") {
    document.getElementById("mainmenu").style.display = "none";
  } else {
    document.getElementById("mainmenu").style.display = "block";
  }
}
document.getElementById("menuicon").addEventListener("click", mobilemenu);

// get loged in user
let logedin = localStorage.getItem("userInfo");
let userlogedin = JSON.parse(logedin);
let logout = document.getElementById("logedin");
let mobileLogout = document.getElementById("mobileLogedin");

if (userlogedin) {
  logout.innerHTML = "Logout";
  mobileLogout.innerHTML = "Logout";
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    const keys = ["userInfo", "token"];

    keys.forEach((key) => {
      window.localStorage.removeItem(key);
      location.reload();
    });
  });
  mobileLogout.addEventListener("click", (e) => {
    e.preventDefault();
    const keys = ["userInfo", "token"];

    keys.forEach((key) => {
      window.localStorage.removeItem(key);
      location.reload();
    });
  });
} else {
  if (logout || mobileLogout) {
    logout.innerHTML = "Login";
    mobileLogout.innerHTML = "Login";
  }
}

let loginstatus = document.getElementById("loginstatus");
if (loginstatus) {
  if (userlogedin) {
    // console.log("loged in", userlogedin.username);
    loginstatus.innerHTML = `${userlogedin.username}` + " Loged in";
  } else {
    loginstatus.innerHTML = "Login";
  }
}
