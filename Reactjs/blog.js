function Test() {
  const great = <div>hi</div>;
  return (
    <React.Fragment>
      <h2>{great} i'm testing</h2>
      <h1>{great} oliviertech</h1>
    </React.Fragment>
  );
}

const element = (
  <React.Fragment>
    <h2> i'm testing</h2>
    <h1> oliviertech</h1>
  </React.Fragment>
);

function App() {
  const [blog, setBlog] = React.useState({});

  const fetchData = async () => {
    const response = await fetch(
      "https://expensive-newt-tiara.cyclic.app/articles/getall"
    );
    const data = await response.json();
    // console.log(data.article);
    return setBlog(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (blog.status === "success") {
    console.log("blog", blog.article[0]);
    return (
      <React.Fragment>
        <div>hello</div>
      </React.Fragment>
    );
  }
}

function TApp() {
  const [user, setUser] = React.useState([]);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
    return setUser(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>User List</h1>
      <ul>
        {user &&
          user.length > 0 &&
          user.map((userObj, index) => (
            <li key={userObj.id}>{userObj.name}</li>
          ))}
      </ul>
    </main>
  );
}

function Blog() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://expensive-newt-tiara.cyclic.app/articles/getall",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setBlogs(data.article);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);
  console.log("blogs", blogs);
  return (
    <div>
      {loading && <div id="loader" className="loader"></div>}
      {!loading && (
        <div id="blog-container" className="blog-container">
          {blogs.map((blog) => (
            <div className="blog" key={blog._id}>
              <p className="date">{new Date(blog.createdAt).toDateString()}</p>
              <h1>{blog.title}</h1>
              <div className="blog-pc">
                <img className="mobile" src={blog.image} alt="" />
              </div>
              <div id="blog-desc" className="blog-desc">
                {blog.content.trim().slice(0, 120) + "...."}
              </div>
              <div>
                <button
                  id="readmore"
                  className="readmore"
                  data-b-id={blog._id}
                  type="button"
                  onClick={() => {
                    window.location.href = "./singlepage.html?id=" + blog._id;
                  }}
                >
                  Read more{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function readmore(id) {
    console.log("button clicked");
    window.location.href = "./singlepage.html?id=" + id;
  }
}

const domContainer = document.querySelector("#blog-section");
const root = ReactDOM.createRoot(domContainer);
console.log(domContainer);
// root.render(<Test />);
ReactDOM.render(<Blog />, domContainer);
// ReactDOM.render(<TApp />, domContainer);
