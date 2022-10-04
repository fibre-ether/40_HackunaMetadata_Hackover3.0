import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/AuthActions";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("user");
  const { authLoader } = useSelector((state) => state.auth);

  let navigate = useNavigate();

  useEffect(() => {
    if (authLoader === "loginSuccess") {
      navigate("homePageRoute");
    }
    //eslint-disable-next-line
  }, [authLoader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      loginUser({ email: credentials.email, password: credentials.password, role: userType })
    );
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="md:bg-none bg-cover font-poppins">
      <div className="w-full h-screen flex backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] md:shadow-lg md:shadow-gray-300 w-[900px] rounded-lg">
          <div className="w-[900px] flex-col justify-around">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h2 className="px-5 p-md-0 mt-6 text-center text-3xl font-bold tracking-tight text-indigo-600 margin-top-sm">
                    Sign In To Your Account
                  </h2>
                </div>
                <div className="h-12 w-auto flex justify-center items-center">
                    <button className="mx-2 w-24 flex justify-center rounded-md border-2 p-2" onClick={() => setUserType("user")} >User</button>
                    <button className="mx-2 w-24 flex justify-center rounded-md border-2 p-2" onClick={() => setUserType("organizer")} >Organizer</button>
                    <button className="mx-2 w-24 flex justify-center rounded-md border-2 p-2" onClick={() => setUserType("admin")} >Admin</button>
                </div>
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div className="-space-y-px rounded-md">
                  <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={credentials.email}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {/* <p className="font-medium text-indigo-400 hover:text-indigo-600">
                        Forgot your password?
                      </p> */}
                    </div>
                  </div>
                  <div>
                    <button
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold text-lg disabled:bg-indigo-400 "
                      disabled={authLoader==="loading"}
                      >
                      {authLoader==="loading" ? "..." : "Sign in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;