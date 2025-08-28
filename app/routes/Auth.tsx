import React, { useEffect } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Auth | Resume Analyzer " },
    { name: "description", content: "Authenticate to access your resumes" },
    { name: "icon", href: "/favicon.ico" },
  ];
};
const Auth = () => {
  //alert("auth....");
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, auth } = usePuterStore();
  const nextPath = location.search.split("next=")[1] || "/";
  useEffect(() => {
    if (auth.isAuthenticated) {
      if (nextPath && nextPath !== "/" && nextPath !== "/auth")
        navigate(`/${nextPath}`);
      else navigate("/");
    }
  }, [nextPath, auth.isAuthenticated]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    auth.signIn();
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <h1 className="text-black text-6xl font-semibold">Welcome back!</h1>
            <h2 className="text-[32px] font-normal mt-4">
              Log In to Continue Your Job Journey
            </h2>
          </div>
          {isLoading ? (
            <button className="auth-button" disabled>
              {" "}
              sign in you out .....
            </button>
          ) : auth.isAuthenticated ? (
            <button className="auth-button" onClick={() => auth.signOut()}>
              {" "}
              sign out
            </button>
          ) : (
            <>
              <div className="bg-white p-10 rounded-2xl shadow-lg ">
                <Form
                  className=" flex items-center justify-center"
                  onSubmit={handleSubmit}
                >
                  <div className=" flex flex-col gap-8 justify-around ">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email">Enter your Email</label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-4 font-semibold text-xl"
                        //className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password">Enter your password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-4 font-semibold text-xl"
                        // required
                      />
                    </div>
                    <button
                      // onSubmit={handleSubmit}
                      type="submit"
                      className="auth-button"
                    >
                      Log In
                    </button>
                  </div>
                </Form>
              </div>
              <div className="flex flex-col items-center justify-center mt-6">
                <h2 className="!text-xl font-normal">
                  Don’t have an account?{" "}
                  <Link
                    to={"/sign-up"}
                    className="text-light-blue-500 font-semibold text-2xl"
                  >
                    {" "}
                    Sign up
                  </Link>
                </h2>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;
