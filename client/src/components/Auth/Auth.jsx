import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { login, signin, signup } from "../../features/auth/authSlice";
import Input from "./Input";
import { styles } from "../../styles";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = isSignup ? signup(formData) : signin(formData);

    dispatch(action).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(login(response.payload));
        navigate("/");
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-1/2 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
          {isSignup ? "Create your Account " : "Sign in to your account"}
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <Input
              name="fullName"
              type="text"
              id="fullName"
              label="Full Name"
              placeholder="e.g. John Doe"
              handleChange={handleChange}
            />
          )}
          <Input
            name="email"
            type="email"
            id="email"
            label="Your email"
            placeholder="Enter your email"
            handleChange={handleChange}
          />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            placeholder="Enter your password"
            isPassword={true}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
          />
          {isSignup && (
            <Input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              label="Repeat Password"
              placeholder="Repeat Password"
              isPassword={true}
              handleChange={handleChange}
            />
          )}
          {!isSignup && (
            <div className="flex items-center justify-between">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-3 text-sm text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}
          <button
            type="submit"
            className={`${styles.colored_shadow_buttons} ${styles.blue_gradient} w-full`}
          >
            {isSignup ? "Create an account" : "Sign In"}
          </button>
          {!isSignup && (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                const result = jwtDecode(token);
                console.log(result, token)
                dispatch(login({ result, token }));
                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}

          <p className="text-sm font-light text-gray-500">
            {isSignup
              ? "Already have an account?"
              : "Don’t have an account yet?"}
            <a
              href="#"
              className="ml-2 font-medium text-primary-600 hover:underline"
              onClick={switchMode}
            >
              {isSignup ? "Login here" : "Sign up here"}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Auth;
