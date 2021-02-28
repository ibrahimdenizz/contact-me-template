import { useState } from "react";
import "./App.css";
import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/send";

function App() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    top: "",
    title: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      setErrors((prevErrors) => {
        prevErrors.title = "Please fill the title";
        return prevErrors;
      });
      return;
    }
    if (email === "") {
      setErrors((prevErrors) => {
        prevErrors.email = "Please fill the email";
        return prevErrors;
      });
    }

    if (message === "") {
      setErrors((prevErrors) => {
        prevErrors.message = "Please fill the message";
        return prevErrors;
      });
    }

    try {
      const result = await axios.post(url, {
        title,
        email,
        message,
      });
      if (result.data.path === "success") setSuccess(result.data.message);
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 400 || status === 500) {
          setErrors((prevErrors) => {
            prevErrors.top =
              data.path === "top" ? data.message : prevErrors.top;
            prevErrors.title =
              data.path === "title" ? data.message : prevErrors.title;
            prevErrors.email =
              data.path === "email" ? data.message : prevErrors.email;
            prevErrors.message =
              data.path === "message" ? data.message : prevErrors.message;
            return prevErrors;
          });
        }
      }
    }
  };

  return (
    <div className="container h-100">
      <div className="h-100 d-flex align-items-center justify-content-center ">
        <form className="w-50" onSubmit={onSubmit}>
          {success === "" ? "" : <p className=" text-success">{success}</p>}
          {errors.top === "" ? (
            ""
          ) : (
            <p className=" text-danger">{errors.top}</p>
          )}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${
                errors.title === "" ? "" : "is-invalid"
              }`}
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value === "") {
                  setErrors((prevErrors) => {
                    prevErrors.title = "Please fill the title";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                } else {
                  setErrors((prevErrors) => {
                    prevErrors.title = "";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                }
              }}
              required
              autoFocus
            />
            <div className=" invalid-feedback">{errors.title}</div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${
                errors.email === "" ? "" : "is-invalid"
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value === "") {
                  setErrors((prevErrors) => {
                    prevErrors.email = "Please fill the email";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                } else {
                  setErrors((prevErrors) => {
                    prevErrors.email = "";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                }
              }}
            />
            <div className=" invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <textarea
              className={`form-control ${
                errors.message === "" ? "" : "is-invalid"
              }`}
              placeholder="Message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (e.target.value === "") {
                  setErrors((prevErrors) => {
                    prevErrors.message = "Please fill the message";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                } else {
                  setErrors((prevErrors) => {
                    prevErrors.message = "";
                    prevErrors.top = "";
                    return prevErrors;
                  });
                }
              }}
              required
            />
            <div className=" invalid-feedback">{errors.message}</div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-outline-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
