import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // Handling the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // Handling the form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Login Response Data:", data); // Log the response data

      if (response.ok) {
        storeTokenInLS(data.token); // Store the token in localStorage
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/"); // Navigate to the home page after successful login
      } else {
        toast.error(data.msg || "Invalid Credentials");
        console.log("Invalid credentials");
      }
    } catch (error) {
      toast.error("Error during login");
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="Login image"
                  width="600"
                  height="600"
                />
              </div>

              {/* Login form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />

                <form onSubmit={handleLogin}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      value={user.email}
                      required
                      autoComplete="off"
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      value={user.password}
                      required
                      autoComplete="off"
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-login">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
