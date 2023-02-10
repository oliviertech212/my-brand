const token = localStorage.getItem("token");

async function displayMessages() {
  console.log("hello", token);
  document.getElementById("loader").style.display = "block";
  document.getElementById("contentTomange").style.visibility = "hidden";
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
            <td>${blog.article[i].title.slice(0, 50) + "....."}</td>
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
        document.getElementById("loader").style.display = "none";
        document.getElementById("contentTomange").style.visibility = "visible";
      }
    })
    .catch((err) => {
      // document.getElementById("contentTomange").innerHTML = err;
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

// adding event listener to parent using event delegation injavascript
// document
//   .getElementById("contentTomange")
//   .addEventListener("click", function (e) {
//     if (e.target.classList.contains("delete")) {
//       console.log(e.target.dataset.blogId);
//       deletemessage(e.target.dataset.blogId);
//       // to loaad window after delete
//       setTimeout(() => {
//         //   reload window
//         location.reload();
//       }, 2000);
//     }
//   });

// adding event listener to parent using event delegation injavascript
if (document.getElementById("contentTomange")) {
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
      } else if (e.target.className == "edit") {
        let update = document.getElementById("contentToUpdate");

        update.scrollIntoView();

        //  get article by id
        async function getarticle(i) {
          await fetch(
            `https://expensive-newt-tiara.cyclic.app/articles/getOne/${i}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log("result", result.article);

              update.innerHTML = `<form id="blogform" autocomplete="off" action="" >
              <div>
                  <label class="text-label">Title</label>
                  <input id="blogtitle" type="text" name="title" value="${result.article.title}" class="text-input">
                  <p class="error"></p>
              </div>
              <div>
                  <label class="text-label">image</label>
 
                  <input id="blogimage" type="file" name="image" value="${result.article.image}"  class="text-input image" >
                  <p class="error"></p>
              </div>
 
              <div>
                  <label class="text-label">Content</label>
                  <br>
                  <textarea   name="" id="editor" width="40" rows="10">${result.article.content}</textarea>
                  <p class="error"></p>
              </div>
 
              <div>
                  <button type="submit" onclick="event.preventDefault();" data-update-id="${result.article._id}"  id="test" class="btn-su">Update</button>
              </div>
 
              </form>`;

              // initialize tinymce
              tinymce.init({
                selector: "#editor",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        getarticle(e.target.dataset.bloId);

        update.addEventListener("click", function (e) {
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

            let blogimage = document.getElementById("blogimage");

            let blogcontent = tinyMCE.get("editor").getContent();
            // Use a regular expression to remove the HTML tags from the string
            var text = blogcontent.replace(/<[^>]*>/g, "");

            // blogpost content

            let blogtitlevalue = blogtitle.value;
            let blogcontentvalue = text;

            if (blogtitlevalue === "") {
              seterror(blogtitle, "please blog must contain title");
            } else {
              setsuccess(blogtitle);
            }

            async function updateMessage(id) {
              const formData = new FormData();
              formData.append("content", blogcontentvalue);
              formData.append("title", blogtitlevalue);
              formData.append("image", blogimage.files[0]);

              await fetch(
                `https://expensive-newt-tiara.cyclic.app/articles/update/${id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: formData,
                }
              )
                .then(async (res) => {
                  if (res.status == 200) {
                    location.reload();
                  }

                  return await res.json();
                })

                .then((result) => {
                  console.log("result", result);
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            // adding event listener to parent using event delegation in javascript
            // document
            //   .getElementById("contentTomange")
            //   .addEventListener("click", function (e) {
            //     if (e.target.classList.contains("edit")) {
            //       console.log(e.target.dataset.bloId);
            //       updateMessage(e.target.dataset.bloId);
            //       // to reload window after update
            //       setTimeout(() => {
            //         // reload window
            //         location.reload();
            //       }, 2000);
            //     }
            //   });

            updateMessage(e.target.dataset.updateId);
          };

          if (btn && e.target.className == "btn-su") {
            btn.addEventListener("click", () => {
              console.log(btn);
              //   e.preventDefault();
              validateinputs();
            });
          }
        });
      }
    });
}
