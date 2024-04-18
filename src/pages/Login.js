import React, { useEffect, useState } from "react";
import picture from "../Images/pic.webp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import USERIMAGE from "../Images/profile.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    
    e.preventDefault();
    const validEmail = "kashish@gmail.com";
    const validPassword = "12345678";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Successfully logged in!", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
      navigate("/wishlist");
    } else {
      toast.error("Incorrect email or password. Please try again.", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast.success("Successfully logged out!", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });

    navigate("/");
  };
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-hidden">
      <>
        {!isLoggedIn ? (
          <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-28 mx-auto">
              <div class=" bg-white  shadow dark:border md:mt-0 max-w-[260px] sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <img src={picture} className="object-contain" />
                <div class="p-3  space-y-4 md:space-y-6  sm:p-8">
                  <h1 class="sm:text-xl text-base font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    onSubmit={handleLogin}
                    class="space-y-4 md:space-y-6"
                    action="#"
                  >
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2  text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full border  text-white bg-rose-500  focus:outline-none font-medium rounded-lg text-sm sm:text-md px-5 py-2.5 text-center "
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto h-full  sm:py-0 sm:h-screen lg:py-0">
              <div className="w-[210px] bg-white shadow dark:border md:mt-0 sm:h-72 sm:w-[350px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
                  <div className="flex justify-center items-center">
                    <img
                      src={USERIMAGE}
                      alt="useImage"
                      className="sm:w-28 w-16"
                    />
                  </div>
                  <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 sm:text-lg dark:text-white">
                    You are logged in!
                  </h1>

                  <button
                    onClick={handleLogoutClick}
                    className="w-full border text-white bg-rose-500 focus:outline-none font-medium rounded-lg text-[11px] sm:text-sm px-5 py-2.5 text-center"
                  >
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    </div>
  );
};

export default Login;
