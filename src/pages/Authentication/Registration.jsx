import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import bikeCourier from "@/assets/bikeCourier";

const Registration = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const image = form.image.value;
    const pass = form.password.value;
    console.log({ email, name, image, pass });
  };
  const handleGoogleLogin = () => {};
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg  lg:max-w-4xl ">
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center text-gray-600 ">
              Create a Account It&apos;s Free!
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
                Registration with email and Password
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="mt-4">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  name="name"
                  required
                  type="text"
                />
              </div>
              <div className="mt-4">
                <Label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </Label>
                <Input
                  id="LoggingEmailAddress"
                  autoComplete="email"
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <Label
                    className="block mb-2 text-sm font-medium text-gray-600 "
                    htmlFor="loggingPassword"
                  >
                    Password
                  </Label>
                </div>
                <Input
                  id="loggingPassword"
                  autoComplete="current-password"
                  name="password"
                  required
                  type="password"
                />
              </div>
              <div className="mt-4">
                <Label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="image"
                >
                  Image
                </Label>
                <Input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>

              <Button type="submit" className="w-full mt-4">
                Register
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

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4"></span>

              <Link
                to="/login"
                className="text-xs text-gray-500 uppercase  hover:underline"
              >
                or log in
              </Link>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </div>
          <div className="hidden justify-center items-center my-auto lg:block lg:w-1/2">
            <Lottie
              animationData={bikeCourier}
              className="transform scale-x-[-1]"
            ></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
