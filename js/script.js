

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




// specifying characters needed to be rendered on blog card
(function() {
    let description=document.querySelectorAll("#blog-desc");
    description.forEach((i)=>{
        i.innerHTML=i.innerText.trim().slice(0,120)+"....";
    });
})();
