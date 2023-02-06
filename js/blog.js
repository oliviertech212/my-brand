const token = localStorage.getItem("token");

let blogDisplay = document.querySelector(".blog-container");
let singleblg = document.getElementById("single-blog");

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
      blog.article.forEach((blog) => {
        let createdAt = blog.createdAt;
        let date = new Date(createdAt);
        let dateString = date.toDateString();
        console.log(blog);
        blogDisplay.insertAdjacentHTML(
          "beforeend",
          ` <div class="blog">
               <p class="date">${dateString}</p>
               <h1>${blog.title}</h1>
               <div class="blog-pc">
               <img  class="mobile"  src="${blog.image}" alt="">
               </div>
               <div id="blog-desc" class="blog-desc">${
                 blog.content.trim().slice(0, 120) + "...."
               }</div>
               <div>
                  <button  id="readmore" class="readmore" data-b-id="${
                    blog._id
                  } " type="button">
                      Read more
                      <span>
                          <i class="fa-solid fa-arrow-right"></i>
                      </span>
                  </button>

               </div>

           </div>
          `
        );
      });
    })
    .catch((err) => {
      // document.getElementById("contentTomange").innerHTML = err;
      console.log(err);
    });
}
displayMessages();
let singleid;
if (blogDisplay) {
  blogDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("readmore")) {
      //   console.log(e.target);
      //   // readmore(e.target.dataset.bId)
      //   if (index == e.target.dataset.bId) {
      //     singleblog();
      //     //   scroll to single blog
      // singleblg.scrollIntoView();
      //   }
      singleid = e.target.dataset.bId;
      singArticle(e.target.dataset.bId);
    }

    //   add like an dcomment
    if (e.target.classList.contains("like")) {
      document.querySelectorAll(".like").forEach((i, index) => {
        console.log(i);
      });
    }
  });
}
//  else {
//   singArticle(singleid);
// }

async function singArticle(i) {
  console.log("single id", singleid);
  await fetch(`https://expensive-newt-tiara.cyclic.app/articles/getOne/${i}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(async (singArticle) => {
      window.location.href = "./singleblog.html";
      console.log("result", singArticle.article, singleid, singleblg);
      // singArticle.article.forEach((blog) => {
      let createdAt = singArticle.article.createdAt;
      let date = new Date(createdAt);
      let dateString = date.toDateString();
      singleblg.innerHTML = `
        <section class="blog-section">

            <div class="blog">
                <div class="blog-pc">
                    <img width="500px" height="500px"  class="mobile" src="${singArticle.article.image}" alt="">
                </div>
            </div>
            <div class="blog-desc">
                <div>
                    <h1>${singArticle.article.title}</h1>
                ${singArticle.article.content}
                </div>

                <div id="comt">
                    <button  id="readLess" class="readless" data-b-id="${singArticle.article._id} " type="button">
                                Read Less
                                <span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </span>
                    </button>
                    <div class="like-comment">
                              comment
                              <span class="material-symbols-outlined" id="show-comment">
                                 comment
                              </span>
                    </div>
                </div>

                <div class="user" id="user">
                     <div id="form">
                        <form id="commentform" action="">
                         <div>
                           <label for="">name</label><br>
                          <input class="input-txt" id="username" value="" type="text">
                         </div>

                         <div>
                           <label for="">coment</label><br>
                          <textarea class="input-txt" id="usercomment" name="" id="" cols="30" rows="5"></textarea>
                          <input id="usertitle" type="hidden" value="${singArticle.article.title}">
                         </div>

                          <button type="submit" id="sub" value="submit" onclick="event.preventDefault()" >Send</button>
                        </form>
                     </div>

                     <div  id="cmt">

                     </div>
                </div>

            </div>

        </section>  `;
    })
    .catch((err) => {
      console.log(err);
    });
}

//   document
//     .getElementById("contentTomange")
//     .addEventListener("click", function (e) {
//       if (e.target.classList.contains("delete")) {
//         console.log(e.target.dataset.blogId);
//         singArticle(e.target.dataset.blogId);
//         // to loaad window after delete
//         setTimeout(() => {
//           //   reload window
//           location.reload();
//         }, 2000);
//       }
//     });

// let singleblg = document.getElementById("single-blog");

// //read data from firebase
// getDocs(q).then((docSnap) => {
//   let blogs = [];
//   docSnap.forEach((blog) => {
//     blogs.push({ ...blog.data(), id: blog.id });
//     console.log("blogs", blog.data());
//   });

//   // console.log(blogs);
//   blogs.forEach((blog, index) => {
//     // function blogRendering(){
//     blogDisplay.insertAdjacentHTML(
//       "beforeend",
//       ` <div class="blog">
//              <p class="date">${blog.date}</p>
//              <h1>${blog.title}</h1>
//              <div class="blog-pc">
//              <img  class="mobile"  src="${blog.image}" alt="">
//              </div>
//              <div id="blog-desc" class="blog-desc">${
//                blog.content.trim().slice(0, 120) + "...."
//              }</div>
//              <div>
//                 <button  id="readmore" class="readmore" data-b-id="${index} " type="button">
//                     Read more
//                     <span>
//                         <i class="fa-solid fa-arrow-right"></i>
//                     </span>
//                 </button>

//              </div>

//          </div>
//         `
//     );
//     blogDisplay.addEventListener("click", (e) => {
//       if (e.target.classList.contains("readmore")) {
//         console.log(e.target);
//         // readmore(e.target.dataset.bId)
//         if (index == e.target.dataset.bId) {
//           singleblog();
//           //   scroll to single blog
//           singleblg.scrollIntoView();
//         }
//       }

//       //   add like an dcomment
//       if (e.target.classList.contains("like")) {
//         document.querySelectorAll(".like").forEach((i, index) => {
//           console.log(i);
//         });
//       }
//     });

//   function singleblog() {
//     // like
//     //   <span "> <i id="${index}"class="like fa-solid fa-thumbs-up"> <span class="likes-value-${index}">${blog.likes}</span></i></span>

//     console.log("blogtitle", blog.title);

//     document
//       .getElementById("show-comment")
//       .addEventListener("click", () => {
//         if (document.getElementById("user").style.display == "none") {
//           document.getElementById("user").style.display = "block";
//         } else {
//           document.getElementById("user").style.display = "none";
//         }
//       });

//     getDocs(c).then((docSnap) => {
//       let comments = [];
//       docSnap.forEach((comment) => {
//         comments.push({ ...comment.data(), id: comment.id });
//         console.log("comment ", comment.data());
//       });
//       console.log(comments);
//       const cmtid = document.getElementById("cmt");
//       for (let i = 0; i < comments.length; i++) {
//         if (comments[i].title == blog.title) {
//           cmtid.innerHTML += `
//                   <div class="cmt"  >
//                       <p id="uname">${comments[i].username}</p>
//                       <p id="cm">${comments[i].usercomment}</p>
//                   </div>
//           `;
//         }
//       }

//       // const cm= document.getElementById("cm");
//     });

//     console.log(document.getElementById("commentform"));

//     document.getElementById("sub").addEventListener("click", function (e) {
//       e.preventDefault();
//       //   console.log("useris ",username.value);
//       const usename = document.getElementById("username");
//       const usecomment = document.getElementById("usercomment");
//       const usertitle = document.getElementById("usertitle");
//       //   function savecomment (){
//       let uname = usename.value;
//       let ucomment = usecomment.value;
//       let utitle = usertitle.value;
//       addDoc(collection(d, "blogcomment"), {
//         title: utitle,
//         username: uname,
//         usercomment: ucomment,
//       });
//       //   }

//       console.log("btn clicked");
//     });

//     singleblg.addEventListener("click", (e) => {
//       if (e.target.classList.contains("readless")) {
//         console.log(e.target);
//         // readmore(e.target.dataset.bId)
//         //   if(index==e.target.dataset.bId){
//         //       singleblog()
//         //     //   scroll to single blog
//         //     singleblg.scrollIntoView();
//         //   }
//         //   }
//         //   else if(index==""){
//         blogDisplay.scrollIntoView();
//       }
//     });
//   }

// window.location.href = "./singleblog.html";
// if (singleblg) {
//   singArticle(e.target.dataset.bId);
// }
