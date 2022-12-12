

// javascript for mobile menuicon
window.addEventListener("load",()=>{
    document.getElementById("mainmenu").style.display="none";
});


function mobilemenu(){
    if(document.getElementById("mainmenu").style.display==="block"){
        document.getElementById("mainmenu").style.display="none";

    }
    else{
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




// contact form validation

function contactformvalidation(){
    let name=document.contactform.name.value;
    let email=document.contactform.email.value;
    let message=document.contactform.message.value;
    // email id must contain the @ and . character
    // There must be at least one character before and after the @.
    // There must be at least two characters after . (dot).
    let atposition=email.indexOf("@");
    // inorder to get last occurance
    let dotposition=email.lastIndexOf(".");

    if(name===null|| name===""){
        alert("Name can't be blank");
        return false;
    }else if (message.length>200) {
        alert("message must be lessthan 200 character");
        return false;
    }else if (message===null||message==="") {
        alert("please enter your message");
        return false;
    }
    else if(atposition<1||dotposition<atposition+2||dotposition+2>email.length){
        alert("Please enter a valid e-mail address must contain @ and .");  
        return false;
    }else{
        return true;
    }
   
}
// contactformvalidation();g


// login formvalidation

function loginformvalidation(){
    let password=document.loginform.password.value;
    let email=document.loginform.email.value;

    let atposition=email.indexOf("@");
    let dotposition=email.lastIndexOf(".");
    


    if(email!=="oliviertech27@gmail.com"||email===""){
        alert("enter correct email");
        return false;
    } else if(atposition<1||dotposition<atposition+2||dotposition+2>email.length){
        alert("Please enter a valid e-mail address must contain @ and .");  
        return false;
    }
    else if(password===null|| password===""){
        alert("password is must");
        return false;
    }
    else if(password!=="oliviertech"){
      alert("password is incorrect");
      return false;
    }
   else if(email==="oliviertech27@gmail.com"&& password==="oliviertech"){
    return true;
   }
   
}