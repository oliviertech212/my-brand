const root1 = document.getElementById("left-div");
const root = ReactDOM.createRoot(root1);

function Contactform() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [messageError, setMessageError] = React.useState("");

  const [statusMessage, setStatusMessage] = React.useState("");
  // const [isEmailValid, setIsEmailValid] = React.useState("");

  // React.useEffect(() => {
  // const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   setIsEmailValid(isValid);
  // }, [email]);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const checkvalidemail = email === isValid;
  const error = checkvalidemail ? null : "Please enter a valid email address";

  const handlename = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleMessage = (e) => setMessage(e.target.value);

  const token = localStorage.getItem("token");

  const handleformSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    if (!name.trim()) {
      isError = true;
      setNameError("please enter name");
    } else {
      setNameError("");
    }
    if (!isValid) {
      isError = true;
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!message.trim()) {
      isError = true;
      setMessageError("Please enter your message");
    } else {
      setMessageError("");
    }

    if (isError) {
      return;
    }

    fetch("https://expensive-newt-tiara.cyclic.app/contact/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    })
      .then(async (res) => {
        console.log(res);
        if (res.status === 201) {
          let result = await res.json();

          setStatusMessage("Message sent");
          setTimeout(() => {
            setStatusMessage("");
          }, 3000);

          setName("");
          setEmail("");
          setMessage("");

          return result;
        } else if (res.status === 401) {
          setStatusMessage("please sign in");
          setTimeout(() => {
            window.location.href = "./login.html";
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const characterCount = message.length;
  const minimumCharacterCount = 30;
  const characterCountDifference = minimumCharacterCount - characterCount;

  return (
    // <div className="left-div">
    <form name="contactform" id="cform" onSubmit={handleformSubmit} action="">
      {statusMessage && <p id="status">{statusMessage}</p>}
      <div className="label">
        <div className="mobile">
          <label htmlFor="name">name</label>
          <br />
          <input
            onChange={handlename}
            value={name}
            id="cname"
            name="name"
            className="input cname"
            type="text"
            placeholder="enter your name"
          />
          <p className="error">{nameError}</p>
        </div>
        <div className="mobile">
          <label htmlFor="email">email</label>
          <br />
          <input
            onChange={handleEmail}
            value={email}
            id="cemail"
            name="email"
            className="input cemail"
            type="email"
            placeholder="enter your email"
          />

          <p className="error">{emailError}</p>
        </div>
      </div>
      <div className="msg">
        <label htmlFor="message">message</label>
        <textarea
          onChange={handleMessage}
          value={message}
          id="cmessage"
          className="message cmessage"
          placeholder="enter your message "
          name="message"
          cols="30"
          rows="10"
        ></textarea>
        {characterCount < minimumCharacterCount && (
          <div>{characterCountDifference} more characters required.</div>
        )}
        <p className="error">{messageError}</p>
      </div>
      <input id="csubmit" className="send-btn" type="submit" value="send" />
    </form>
    // </div>
  );
}

root.render(<Contactform />);
