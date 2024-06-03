import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import bikeCourier from "@/assets/bikeCourier";
import useAuth from "@/hooks/useAuth";
import { imageUpload } from "@/api/utils";
import toast from "react-hot-toast";

const Registration = () => {
  const {
    setLoading,
    loading,
    createUser,
    signInWithGoogle,
    updateUserProfile,
  } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const image = form.image.files[0];
    try {
      setLoading(true);
      // upload image and get imageURL
      const image_url = await imageUpload(image);
      console.log(image_url);
      // registration
      const result = await createUser(email, password);
      // save name and image in firebase
      await updateUserProfile(name, image_url);
      navigate("/");
      toast.success("Registration Successful");
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
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
                  placeholder="********"
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
              <Button disabled={loading} type="submit" className="w-full mt-4">
                {loading ? <span className="loader"></span> : "Register"}
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
