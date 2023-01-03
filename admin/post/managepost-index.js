{/* <script type="module"> */}
    // export  let deleteID="hello";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import { getFirestore,addDoc,collection,deleteDoc,doc , getDoc,query,getDocs,updateDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
    const firebaseConfig = {
    apiKey: "AIzaSyBSa-jwDGSpcPGoyi127r-eoaVOdi0xQfY",
    authDomain: "my-brand-ab3eb.firebaseapp.com",
    projectId: "my-brand-ab3eb",
    storageBucket: "my-brand-ab3eb.appspot.com",
    messagingSenderId: "1054921679340",
    appId: "1:1054921679340:web:179e54d3c673a25a97a0c9",
    measurementId: "G-8T216E4TG5"
  };
        
       
       // Initialize Firebase
    const app=initializeApp(firebaseConfig);
    const db=getFirestore(app);

    // access data using query
    const q=query(collection(db,"cretedblogs"));


  
    getDocs(q).then(docSnap=>{
        let blogs=[];
        docSnap.forEach(blog => {
            blogs.push({...blog.data(), id:blog.id})
        });
      
      console.log(blogs);
      
        function manageposts(){
     
           let table=`
             <table>
               <thead>
                   <th>Number</th>
                   <th>Title</th>
                   <th>Date</th>
                   <th>image</th>
                   <th colspan="3">Action</th>
               </thead>
               <tbody id="blogtable">
             
           `;
           // blogs.forEach(element => {
               for(let i=0;i<blogs.length;i++){
             table+=`
               <tr>
                   <td>${i+1}</td>
                   <td>${blogs[i].title}</td>
                   <td>${blogs[i].date}</td>
                   <td><img width="40px" height="40px" src="${blogs[i].image}">  </td>
                   <td>
                       <a  type="button" class="edit" data-blo-id="${blogs[i].id}">edit</a>  
                       <a type="button" id="delet"   class="delete"  data-blog-id="${blogs[i].id}">delete</a> 
                   </td>
               </tr>
             `   
           };
           table=table+`
              </tbody>
             </table>
           `

           if(document.getElementById("contentTomange")){
            document.getElementById("contentTomange").innerHTML=table

           }
          
           // console.log(table);
    
        }   
         
        manageposts();
        // console.log("blogs",deletblog());
        


      
    });
      






// // // localStorage.clear()
// window.addEventListener("load",(e)=>{
//     e.preventDefault();
// })

// function editblog(i){
//     console.log(i);

// }
//

    function deletblog(i){
        deleteDoc (doc(db, "cretedblogs",`${i}`));
        // to loaad window after delete
        // window.location.href="./index.html"
        // return "deleted"
        console.log("deleted");
    };
   
  
    
  

    // function updateblog(i){
        
    //     updateDoc (doc(db, "cretedblogs",`${i}`),{
    //         image:"image",
    //         title:blogtitle,
    //         content:blogcontent,
    //         date:blogdate
    //     });
    //     // // to loaad window after delete
    //     // window.location.href="./index.html"
    //     // // return "deleted"
    //     console.log(i,"is updated now");
    // };
   

    // adding event listener to parent using event delegation injavascript
    if( document.getElementById("contentTomange")){
  
        document.getElementById("contentTomange").addEventListener("click",function (e){
        
            if(e.target.classList.contains('delete')){
                console.log(e.target.dataset.blogId)
                deletblog(e.target.dataset.blogId)
                  // to loaad window after delete
            setTimeout(() => {
                //   reload window
                location.reload(); 
            },2000);
            }
            else if(e.target.className=='edit'){
           
                // console.log(e.target.dataset.bloId)
                // updateblog(e.target.dataset.blogId)
               let deleteID=e.target.dataset.bloId;
               //    export default deleteID;
            //    if(addDoc(collection(db, "deletId"),{
            //     id:deleteID
            //    })){
                    // window.location.href="./edit.html";
                // console.log("added");
                
            //    }
               console.log(deleteID);
               edit(deleteID)
               console.log(edit(deleteID));
            }
        })
        
    }
    function edit(id){
        console.log("iddd",id);
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
        
        
        // let form2=document.getElementById("blogform");
        let blogtitle=document.getElementById("blogtitle");
        let blogimage=document.getElementById("blogimage");
        let blogdate=document.getElementById("blogdate");
        let blogcontent=document.getElementById("editor");
        let btn=document.getElementById("test");
        
        let image;
        // console.log("textarea",blogcontent.value);
        if(blogimage){
            blogimage.addEventListener("change",(e)=>{
            
                const img=e.target.files[0];
        
                const reader=new FileReader();
        
                reader.readAsDataURL(img);
                // console.log(reader.readAsDataURL(img))
              
                reader.addEventListener("load",()=>{
                    image=reader.result;
                    // console.log(image);
        
                });
            });
        }
        
           
            
           
        
        const validateinputs=()=>{
        
            // blogpost content
            let blogimagevalue=image;
            let blogtitlevalue= blogtitle.value;
            let blogcontentvalue= blogcontent.value;
            let blogdatevalue=blogdate.value;
           
            if (blogtitlevalue==="") {
                seterror(blogtitle,"please blog must contain title");
                
            } else {
                setsuccess(blogtitle)
            }
        
            if (blogdatevalue==="") {
                seterror(blogdate,"please blog must contain date");
            } else {
                setsuccess(blogdate)
            }
        
            if (blogimagevalue==="") {
                seterror(blogimage,"please choose image for blog");
        
                
            } else {
                // console.log(blogimagevalue);
                setsuccess(blogimage)
            }
        
            if (blogcontentvalue==="") {
                seterror(blogcontent,"write body content");
                
            } else {
                setsuccess(blogcontent)
            }
            console.log(id);
            if(blogtitlevalue!==""&&blogimagevalue!==""&& blogdatevalue!==""){
               
            
            
        
        
                
                
                updateDoc (doc(db, "cretedblogs",`${id}`),{
                    image:blogcontentvalue,
                    title:blogtitlevalue,
                    content:blogcontentvalue,
                    date:blogdatevalue,
                    likes:0
                });
            
           
            
        
            // access data using query
            const q=query(collection(db,"cretedblogs"));
        
            getDocs(q).then(docSnap=>{
                let blogs=[];
                docSnap.forEach(blog => {
                    blogs.push({...blog.data(), id:blog.id})
                });
                console.log("blogs",blogs);
                blogid=blogs;
            });
              
          
            
            }
        
        }
        
        // document.getElementById("tobedeleted").innerHTML="deleteID
        
        // console.log(deleteID);
        
         
         
        
        
        if(btn){

        btn.addEventListener("click",e=>{
            e.preventDefault();
            validateinputs();
        
            // make field empty after create
            blogimage.value="";
            blogtitle.value="";
            blogcontent.value="";
            blogdate.value="";
        
           
        });
        }

    }
    
{/* </script> */}