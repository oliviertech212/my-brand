
//    manageposts();

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


// set error popup an form validated

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





// contact form validation
const contactform=document.getElementById("cform");
let csubmit=document.getElementById("csubmit");
function contactformvalidation(){
    const cname=document.querySelector(".cname");
    const cemail=document.querySelector(".cemail");
    const cmessage=document.querySelector(".cmessage");
    // email id must contain the @ and . character
    // There must be at least one character before and after the @.
    // There must be at least two characters after . (dot).
    let atposition=cemail.value.indexOf("@");
    // inorder to get last occurance
    let dotposition=cemail.value.lastIndexOf(".");
    if (cname.value===""){
        seterror(cname,"name is required");
    }
    else{
        setsuccess(cname)
        console.log(cemail.value);
    }

    if(cemail.value===""){
        seterror(cemail,"please enter your email");
    }else{
        setsuccess(cemail);
    }
   
    if(atposition<1||dotposition<atposition+2||dotposition+2>cemail.length){
        // alert("Please enter a valid e-mail address must contain @ and .");  
        seterror(cemail,"Please enter a valid e-mail address contain @ and .")
       
    }
    if(cmessage.value===""){
        seterror(cmessage,"please enter your message");
    }else{
        setsuccess(cmessage);
    }
   
  
    
   if(cemail.value!=='' && cname.value!==''&& cmessage.value!==''){
    let visitors=[];
    if(localStorage.getItem("visitors")){
        // console.log(visitors);
        visitors=JSON.parse(localStorage.getItem("visitors"))
    }else{
        window.localStorage.setItem("visitors",JSON.stringify(visitors));
    }
    function insertuser (){
        let userdetails = {
            username:cname.value,
            useremail:cemail.value,
            usermessage:cmessage.value
        }
        visitors.push(userdetails);
        window.localStorage.setItem("visitors",JSON.stringify(visitors));
        cmessage.value="";
        cemail.value="";
        cname.value="";
    }insertuser();
  
  
 
    
   }
   
    //     // localstorage
    // let userdetails = {
    //     username:name,
    //     useremail:email,
    //     usermessage:message
    // }
    // window.localStorage.setItem("visitor",JSON.stringify(userdetails));
    //     return true; 
   
}
if(contactform){

    contactform.addEventListener("submit",e=>{
        e.preventDefault();
        contactformvalidation();
      },false);
   
}


// login formvalidation
let loginform=document.getElementById("loginform");
let loginBtn=document.getElementById("login-btn");
let adminEmail=document.getElementById("admin-email");
let adminPassword=document.getElementById("admin-pass");
function loginformvalidation(){
    // let password=document.loginform.password.value;
    // let email=document.loginform.email.value;
   

    let atposition=adminEmail.value.indexOf("@");
    let dotposition=adminEmail.value.lastIndexOf(".");
    
    let user = {
        email:adminEmail.value,
        password:adminPassword.value
    };

    if(adminEmail.value===""){
        seterror(adminEmail,"please enter your email");
    }else{
        setsuccess(adminEmail);
    }
   
    if(atposition<1||dotposition<atposition+2||dotposition+2>adminEmail.length){
        // alert("Please enter a valid e-mail address must contain @ and .");  
        seterror(adminEmail,"Please enter a valid e-mail address contain @ and .")
       
    }

  
    if(adminPassword.value===""){
        // alert("password is must");
       seterror(adminPassword,"password is must" )
    }
    else{
        setsuccess(adminPassword)
    }
    console.log(user);
   
    window.localStorage.setItem("admin",JSON.stringify(user));
    if(localStorage.getItem("admin")){
        if(JSON.parse(window.localStorage.getItem("admin")).password!=="oliviertech"){
            seterror(adminPassword,"enter correct admin password" )

        }else {
            window.location.href="../admin/post/index.html"
            setsuccess(adminPassword);
          

        }

    }

        
      
    

 
  
}
// loginformvalidation()
if(loginform){
    loginform.addEventListener("submit",(e)=>{
        e.preventDefault();
        loginformvalidation();
    },false);

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



// for create page




    // // localStorage.clear()
    // // tinymce.init({
    // //   selector: '#blog-editor'
    // // });

    // // form rorblogpost
    // // localStorage.clear();
    // let form2=document.getElementById("blogform");
    // // let blogtitle=document.getElementById("blogtitle");
    // // let blogimage=document.getElementById("blogimage");
    // // let blogdate=document.getElementById("blogdate");
    // // let blogcontent=document.querySelector(".blog-editor");
    // // let btn=document.getElementById("test");

    // // // table fo manageposts
    // // let posttable= document.getElementById("contentTomange");


    // // let image;
 
        
       
    
    // const validateinputs=()=>{
    
    //     // blogpost content
    //     const blogimagevalue=image;
    //     const blogtitlevalue= blogtitle.value;
    //     const blogcontentvalue= blogcontent.value;
    //     const blogdatevalue=blogdate.value;
       
    //     if (blogtitlevalue==="") {
    //         seterror(blogtitle,"please blog must contain title");
            
    //     } else {
    //         setsuccess(blogtitle)
    //     }
    
    //     if (blogdatevalue==="") {
    //         seterror(blogdate,"please blog must contain date");
    //     } else {
    //         setsuccess(blogdate)
    //     }
    
    //     if (blogimagevalue==="") {
    //         seterror(blogimage,"please choose image for blog");
    
            
    //     } else {
    //         // console.log(blogimagevalue);
    //         setsuccess(blogimage)
    //     }
    
    //     if (blogcontentvalue==="") {
    //         // seterror(blogcontent,"write body content");
            
    //     } else {
    //         setsuccess(blogcontent)
    //     }
    
    //     if(blogtitlevalue!==""&&blogimagevalue!==""&& blogdatevalue!==""){
    //         insertblog()
    //     }
    
    // }
    // console.log("blogcontent value",blogcontent.value);





    
//    manage post page
    
// function manageposts(){
//     let arr=JSON.parse(localStorage.getItem("blogs"));
//     // let arr2=JSON.stringify(arr);
//     console.log( "mangepost" ,arr);
  
//     let table=`
//       <table>
//         <thead>
//             <th>Number</th>
//             <th>Title</th>
//             <th>Date</th>
//             <th colspan="3">Action</th>
//         </thead>
//         <tbody id="blogtable
      
//     `;
// //    arr.forEach(element => {
//      // let item=JSON.stringify(element);
//     // //    console.log(element);
//     for(let i=0;i<arr.length;i++){

//     // })
//     console.log(arr[i]);
   
//       table=table+`
//         <tr>
//             <td>${arr[i].blog}.</td>
//             <td>${arr[i].blogtitle}</td>
//             <td>${arr[i].blogdate}</td>
        
//             <td>
//                 <a href="./edit.html" class="edit">edit</a>  
//                 <a type="button" id="delet" class="delete">delete</a> 
//                 <a href="http://" class="publish">publish</a>
//             </td>
//         </tr>
//       ` ;  
//     };
//     table=table+`
//        </tbody>
//       </table>
//     `
//   posttable.innerHTML=table;
   

// }










    
        // let blogs=[];
   
    
        // function createblogs(){
        //     localStorage.setItem("blogs",JSON.stringify(blogs));
        // };
    
        // function getblog(){
        //     let blogdata=localStorage.getItem("blogs");
        //     if(blogdata){
        //         // console.log("blogdata",JSON.stringify(JSON.parse(blogdata)));
        //         // blogs.JSON.parse(blogdata);
        //     }else{
        //         createblogs();
        //     };
        // };  getblog();
    
    
        // function insertblog(){
        //     manageposts();
            
        //     let blog={
        //     blogcontent:blogcontent.value,
        //     blogdate:blogdate.value,
        //     blogimage:image,
        //     blogtitle:blogtitle.value
        //   };
        //   blogs.push(blog);
        //   createblogs();
        // console.log(blog);
        // console.log("onaddpost",posttable);
    
        //   blogimagevalue=blogimage.value="";
        //   blogtitlevalue= blogtitle.value="";
        // //   blogcontentvalue= blogcontent.value="";
        //   blogdatevalue=blogdate.value="";
       
    
        // };
    
    // }
    
   
    



   



    //  if(btn){
    //     btn.addEventListener("click",e=>{
    //         e.preventDefault();
    
    //         // insertblog();
    //         validateinputs();
    //         insertblog();
    //         console.log("btn",btn);
        
           
    //     });
    
    //     }

    