import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "https://mern-curd-58nn.onrender.com/api/auth/register";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log("Response from server:", resData);
        // Store the token in localStorage
        storeTokenInLS(resData.token);
        // Clear the form inputs
        setUser({ username: "", email: "", phone: "", password: "" });
        // Navigate to the login page
        navigate("/login");
      } else {
        console.log("Registration failed:", response.statusText);
        // Handle registration failure, e.g., display error message
      }
    } catch (error) {
      console.log("Error during registration:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/Reg.png"
                  alt="A girl standing with register"
                  width="500"
                  height="500"
                />
              </div>

              {/* Registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      id="username"
                      value={user.username}
                      required
                      autoComplete="off"
                      onChange={handleInput}
                    />
                  </div>
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
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone"
                      id="phone"
                      value={user.phone}
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
                  <button type="submit" className="btn btn-submit">
                    Register Now
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
