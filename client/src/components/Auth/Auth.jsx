import { useState } from "react";

import { styles } from "../../styles";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <section className="w-1/2 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
          {isSignup ? "Create your Account " : "Sign in to your account"}
        </h1>

        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="Email"
              id="email"
              className={`${styles.form_input}`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="password"
              className={`${styles.form_input}`}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-3 text-sm text-gray-500">
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
          <button
            type="submit"
            className={`${styles.colored_shadow_buttons} ${styles.blue_gradient} w-full`}
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
          Don’t have an account yet?
            <a href="#" className="ml-2 font-medium text-primary-600 hover:underline" onClick={switchMode}>
            Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Auth;
