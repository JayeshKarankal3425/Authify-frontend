import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import assets from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {

  const navigate = useNavigate();

  // true = Create Account
  // false = Login
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendURL } = useContext(AppContext);


  // ================= SUBMIT FORM =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    axios.defaults.withCredentials = true;

    setLoading(true);

    try {

      // ================= REGISTER =================

      if (isCreateAccount) {

        const response = await axios.post(
          `${backendURL}/register`,
          {
            fullName,
            email,
            password
          }
        );

        if (response.status === 201) {

          toast.success("Account created successfully");

          // After registration show Login form
          setIsCreateAccount(false);

          // Clear fields
          setFullName("");
          setEmail("");
          setPassword("");
        }

      }

      // ================= LOGIN =================

      else {

        const response = await axios.post(
          `${backendURL}/login`,
          {
            email,
            password
          }
        );

        if (response.status === 200) {

          toast.success("Login successful");

          navigate("/");
        }
      }

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);

    } finally {

      setLoading(false);
    }
  };


  // ================= SWITCH FORM =================

  const switchForm = () => {

    setIsCreateAccount(!isCreateAccount);

    // Clear old form data
    setFullName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };


  return (

    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 py-4 bg-light">


      {/* ================= LOGO ================= */}

      <div className="text-center mb-4">

        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">

          <img
            src={assets.logo}
            alt="Authify"
            width="48"
            height="48"
          />

          <span
            className="fw-bold"
            style={{
              fontSize: "30px",
              letterSpacing: "-1px",
              color: "#202124"
            }}
          >
            Authify
          </span>

        </div>

        <p className="text-muted mb-0">
          Secure access to your account
        </p>

      </div>


      {/* ================= CONTAINER ================= */}

      <div
        className="w-100"
        style={{ maxWidth: "430px" }}
      >


        {/* ================= CARD ================= */}

        <div
          className="bg-white p-4 p-md-5"
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)"
          }}
        >


          {/* ================= HEADING ================= */}

          <div className="text-center mb-4">

            <h2 className="fw-bold mb-2">

              {isCreateAccount
                ? "Create Account"
                : "Welcome Back!"
              }

            </h2>

            <p className="text-muted mb-0">

              {isCreateAccount
                ? "Create your account to get started"
                : "Login to continue to Authify"
              }

            </p>

          </div>


          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>


            {/* ================= FULL NAME ================= */}

            {isCreateAccount && (

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <div className="input-group">

                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderRadius: "10px 0 0 10px",
                      borderRight: "none"
                    }}
                  >
                    <i className="bi bi-person"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                    style={{
                      borderLeft: "none",
                      borderRadius: "0 10px 10px 0",
                      fontSize: "15px"
                    }}
                  />

                </div>

              </div>

            )}


            {/* ================= EMAIL ================= */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Email Address
              </label>

              <div className="input-group">

                <span
                  className="input-group-text bg-white"
                  style={{
                    borderRadius: "10px 0 0 10px",
                    borderRight: "none"
                  }}
                >
                  <i className="bi bi-envelope"></i>
                </span>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    borderLeft: "none",
                    borderRadius: "0 10px 10px 0",
                    fontSize: "15px"
                  }}
                />

              </div>

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="mb-2">

              <label className="form-label fw-semibold">
                Password
              </label>

              <div className="input-group">

                <span
                  className="input-group-text bg-white"
                  style={{
                    borderRadius: "10px 0 0 10px",
                    borderRight: "none"
                  }}
                >
                  <i className="bi bi-lock"></i>
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    borderLeft: "none",
                    borderRight: "none",
                    fontSize: "15px"
                  }}
                />


                {/* ================= SHOW PASSWORD ================= */}

                <button
                  type="button"
                  className="input-group-text bg-white"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  style={{
                    borderRadius: "0 10px 10px 0",
                    borderLeft: "none",
                    cursor: "pointer"
                  }}
                >

                  <i
                    className={
                      showPassword
                        ? "bi bi-eye-slash"
                        : "bi bi-eye"
                    }
                  ></i>

                </button>

              </div>

            </div>


            {/* ================= FORGOT PASSWORD ================= */}

            {!isCreateAccount && (

              <div className="text-end mb-4">

                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0 fw-semibold"
                  onClick={() => navigate("/reset-password")}
                  style={{ fontSize: "14px" }}
                >
                  Forgot password?
                </button>

              </div>

            )}


            {/* Spacing for Create Account */}

            {isCreateAccount && (
              <div className="mb-4"></div>
            )}


            {/* ================= SUBMIT BUTTON ================= */}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-semibold"
              disabled={loading}
              style={{
                borderRadius: "10px",
                padding: "12px"
              }}
            >

              {loading ? (

                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>

                  Please wait...
                </>

              ) : (

                isCreateAccount
                  ? "Sign Up"
                  : "Login"

              )}

            </button>

          </form>


          {/* ================= SWITCH LOGIN / REGISTER ================= */}

          <div className="text-center mt-4">

            <span className="text-muted">

              {isCreateAccount
                ? "Already have an account? "
                : "Don't have an account? "
              }

            </span>

            <button
              type="button"
              className="btn btn-link text-decoration-none fw-semibold p-0"
              onClick={switchForm}
              disabled={loading}
            >

              {isCreateAccount
                ? "Login"
                : "Create Account"
              }

            </button>

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <p className="text-center text-muted mt-4 small">
          © 2026 Authify. All rights reserved.
        </p>

      </div>

    </div>
  );
};

export default Login;

