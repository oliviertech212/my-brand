const token = localStorage.getItem("token");

async function displayMessages() {
  console.log("hello", token);
  await fetch("https://expensive-newt-tiara.cyclic.app/articles/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => await res.json())
    .then((blog) => {
      let table = `   <table>
      <thead>
          <th>Number</th>
          <th>Title</th>
          <th>Date</th>
          <th>image</th>
          <th colspan="3">Action</th>
      </thead>
      <tbody id="blogtable">`;
      // console.log(blog.message);
      for (let i = 0; i < blog.article.length; i++) {
        let createdAt = blog.article[i].createdAt;
        let date = new Date(createdAt);
        let dateString = date.toDateString();

        //   console.log(blog.message[i]._id);
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${blog.article[i].title}</td>
            <td>${dateString}</td>
            <td><img width="40px" height="40px" src="${
              blog.article[i].image
            }">  </td>
            <td>
                <a  type="button" class="edit" data-blo-id="${
                  blog.article[i]._id
                }">edit</a>  
                <a type="button" id="delet"   class="delete"  data-blog-id="${
                  blog.article[i]._id
                }">delete</a> 
            </td>
        </tr>
      `;
      }
      table += `
  </tbody>
</table>
`;
      if (document.getElementById("contentTomange")) {
        document.getElementById("contentTomange").innerHTML = table;
      }
    })
    .catch((err) => {
      document.getElementById("contentTomange").innerHTML = err;
    });
}
displayMessages();

async function deletemessage(i) {
  await fetch(`https://expensive-newt-tiara.cyclic.app/articles/delete/${i}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("result", result);
    })
    .catch((err) => {
      console.log(err);
    });
}

document
  .getElementById("contentTomange")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      console.log(e.target.dataset.blogId);
      deletemessage(e.target.dataset.blogId);
      // to loaad window after delete
      setTimeout(() => {
        //   reload window
        location.reload();
      }, 2000);
    }
  });

function deletblog(i) {
  deleteDoc(doc(db, "cretedblogs", `${i}`));
  // to loaad window after delete
  // window.location.href="./index.html"
  // return "deleted"
  console.log("deleted");
}

// adding event listener to parent using event delegation injavascript
if (document.getElementById("contentTomange")) {
  document
    .getElementById("contentTomange")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        console.log(e.target.dataset.blogId);
        deletblog(e.target.dataset.blogId);
        // to loaad window after delete
        // setTimeout(() => {
        //     //   reload window
        //     location.reload();
        // },2000);
      } else if (e.target.className == "edit") {
        let update = document.getElementById("contentToUpdate");
        // console.log(e.target.dataset.bloId)
        // updateblog(e.target.dataset.blogId)
        let deleteID = e.target.dataset.bloId;
        update.scrollIntoView();

        getDocs(q).then((docSnap) => {
          let blogs = [];
          docSnap.forEach((blog) => {
            blogs.push({ ...blog.data(), id: blog.id });
          });
          console.log("blogs", blogs);
          for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id == deleteID) {
              console.log(blogs[i].id);

              update.innerHTML = `<form id="blogform" autocomplete="off" action="" >
             <div>
                 <label class="text-label">Title</label>
                 <input id="blogtitle" type="text" name="title" value="${blogs[i].title}" class="text-input">
                 <p class="error"></p>
             </div>
             <div>
                 <label class="text-label">Date</label>
         
                 <input id="blogdate" type="date" value="${blogs[i].date}" name="title" class="text-input">
                 <p class="error"></p>
             </div>
             <div>
                 <label class="text-label">image</label>
              
                 <input id="blogimage" type="file" name="image"  class="text-input image" >
                 <p class="error"></p>
             </div>
             

             <div>
                 <label class="text-label">Content</label>
                 <br>
                 <textarea   name="" id="editor" width="40" rows="10">${blogs[i].content}</textarea>
                 <p class="error"></p>
             </div>

             <div>
                 <button type="submit" onclick="event.preventDefault();" id="test" class="btn-su">Update</button>
             </div>
          
             </form>`;
            }
          }
        });

        update.addEventListener("click", function (e) {
          console.log(document.getElementById("blogimage"));

          // initialize tinymce
          tinymce.init({
            selector: "#editor",
          });

          //   if (e.target.classList.contains("image")) {
          let image;
          console.log("now you can get image");
          // if(blogimage){
          console.log(blogimage, "blogimage is here");
          blogimage.addEventListener("DOMContentLoaded", (e) => {
            const img = e.target.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(img);
            // console.log(reader.readAsDataURL(img))

            reader.addEventListener("load", () => {
              image = reader.result;
              console.log(image);
            });
          });

          // }

          //
          let btn = document.getElementById("test");

          const validateinputs = () => {
            const seterror = (element, messaage) => {
              const inputcontrol = element.parentElement;
              const errorDisplay = inputcontrol.querySelector(".error");

              errorDisplay.innerHTML = messaage;

              // inputcontrol.classList.add("error");
              inputcontrol.children.item(1).classList.add("failed");
              inputcontrol.children.item(1).classList.remove("success");
            };

            const setsuccess = (element) => {
              const inputcontrol = element.parentElement;
              const errorDisplay = inputcontrol.querySelector(".error");

              errorDisplay.innerHTML = "";

              inputcontrol.children.item(1).classList.remove("failed");
              inputcontrol.children.item(1).classList.add("success");
            };

            // let form2=document.getElementById("blogform");
            let blogtitle = document.getElementById("blogtitle");
            let blogdate = document.getElementById("blogdate");
            let blogimage = document.getElementById("blogimage");
            // let blogcontent=document.getElementById("editor");
            let blogcontent = tinyMCE.get("editor").getContent();
            // Use a regular expression to remove the HTML tags from the string
            var text = blogcontent.replace(/<[^>]*>/g, "");

            // blogpost content
            let blogimagevalue = image;
            let blogtitlevalue = blogtitle.value;
            let blogcontentvalue = text;
            let blogdatevalue = blogdate.value;

            if (blogtitlevalue === "") {
              seterror(blogtitle, "please blog must contain title");
            } else {
              setsuccess(blogtitle);
            }

            if (blogdatevalue === "") {
              seterror(blogdate, "please blog must contain date");
            } else {
              setsuccess(blogdate);
            }

            if (blogimagevalue === "") {
              seterror(blogimage, "please choose image for blog");
            } else {
              // console.log(blogimagevalue);
              setsuccess(blogimage);
            }

            // if (blogcontentvalue==="") {
            //     seterror(blogcontent,"write body content");

            // } else {
            //     setsuccess(blogcontent)
            // }

            if (
              blogtitlevalue !== "" &&
              blogimagevalue !== "" &&
              blogdatevalue !== ""
            ) {
              updateDoc(doc(db, "cretedblogs", `${deleteID}`), {
                image: blogimagevalue,
                title: blogtitlevalue,
                content: blogcontentvalue,
                date: blogdatevalue,
              });
            }
          };

          if (btn && e.target.className == "btn-su") {
            btn.addEventListener("click", () => {
              console.log(btn);
              //   e.preventDefault();
              validateinputs();

              console.log(deleteID, "to be updated");
              // setTimeout(() => {
              //   location.reload();
              // },2000);
            });
          }
        });
      }
    });
}
