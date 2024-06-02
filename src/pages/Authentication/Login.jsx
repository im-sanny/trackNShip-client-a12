import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import bikeCourier from "@/assets/bikeCourier";

const Login = () => {
  const handleGoogleLogin = () => {};

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg lg:max-w-4xl my-10">
          <div className="hidden justify-center items-center my-auto lg:block lg:w-1/2">
            <Lottie animationData={bikeCourier}></Lottie>
          </div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center text-gray-600 font-bold">
              Welcome back!
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>
              <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
                login with email and password
              </div>
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center gap-1 mt-4"
            >
              {" "}
              <FcGoogle size={20}></FcGoogle>
              Login with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={"/registration"} className="hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
