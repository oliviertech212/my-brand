

// javascript for mobile menuicon
window.addEventListener("load",()=>{
    document.getElementById("mainmenu").style.display="none";
});

function mobilemenu(){
    if(document.getElementById("mainmenu").style.display==="block"){
        document.getElementById("mainmenu").style.display="none";

    }else{
        document.getElementById("mainmenu").style.display="block"; 
    }
}
document.getElementById("menuicon").addEventListener("click",mobilemenu);