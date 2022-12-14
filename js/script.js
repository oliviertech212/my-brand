


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
        // localstorage
    let userdetails = {
        username:name,
        useremail:email,
        usermessage:message
    }
    window.localStorage.setItem("visitor",JSON.stringify(userdetails));
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
    
    let user = {
        email:email,
        password:password
    }
    window.localStorage.setItem("admin",JSON.stringify(user));

    if(email===""||email===""){
        alert("enter  email");
        return false;
    } else if(atposition<1||dotposition<atposition+2||dotposition+2>email.length){
        alert("Please enter a valid e-mail address must contain @ and .");  
        return false;
    }
    else if(password===null|| password===""){
        alert("password is must");
        return false;
    }
    else if(JSON.parse(window.localStorage.getItem("admin")).password!=="oliviertech"){
      alert("password is incorrect");
      return false;
    }
   else {
    return true;
   }
   
}








// reset form validation

const form=document.getElementById("resetform");
const lastemail=document.getElementById("lastemail");
const lastpassword=document.getElementById("lastpassword");
const newemail=document.getElementById("newemail");
const newpassword=document.getElementById("newpassword");



if(form){

    form.addEventListener("submit",e=>{
        e.preventDefault();
        validateinput();
      },false);
   
}



const seterror=(element,messaage)=>{
    const inputcontrol=element.parentElement;
    const errorDisplay=inputcontrol.querySelector(".error");

    errorDisplay.innerHTML=messaage;
    // inputcontrol.classList.add("error");
    inputcontrol.children.item(1).classList.add("failed");
    inputcontrol.children.item(1).classList.remove("success");
    
}

const setsuccess=element=>{
    const inputcontrol=element.parentElement;
    const errorDisplay=inputcontrol.querySelector(".error")
    
    errorDisplay.innerHTML="";
    inputcontrol.children.item(1).classList.remove("failed");
    inputcontrol.children.item(1).classList.add("success");

}

const validateinput=()=>{
    const lastemailvalue=lastemail.value.trim();
    const lastpasswordvalue=lastpassword.value.trim();
    const newemailvalue=newemail.value.trim();
    const newpasswordvalue=newpassword.value.trim();

    // let atposition=lastemailvalue.indexOf("@");
    // inorder to get last occurance
    // let dotposition=lastemailvalue.lastIndexOf(".");
    let userReset = {
        email:lastemailvalue,
        password:lastpasswordvalue,
        newemail:newemailvalue,
        newpassword:newpasswordvalue
    }
    window.localStorage.setItem("AdminReset",JSON.stringify(userReset));

    if (lastemailvalue===""){
        seterror(lastemail,"lastemail is required");
    }
    else{
        setsuccess(lastemail)
    }

    if(lastpasswordvalue===""){
        seterror(lastpassword,"please enter last password");
    }else{
        setsuccess(lastpassword);
    }





    if (newemailvalue===""){
        seterror(newemail,"newemail is required");
    }
    else{
        setsuccess(newemail)
    }

    if(newpasswordvalue===""){
        seterror(newpassword,"please enter newpassword");
    }else{
        setsuccess(newpassword);
    }

}



