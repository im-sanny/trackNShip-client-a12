import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import bikeCourier from "@/assets/bikeCourier";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const {
    signInWithGoogle,
    loading,
    setLoading,
    signIn,
    resetPassword,
    saveUser,
  } = useAuth();
  const location = useLocation();
  const Form = location?.state || "/";
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(form);
      toast.success("Login Successful");
      form.reset();
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
      const result = await signInWithGoogle();

      // Generate a random phone number
      const randomPhoneNumber = generateRandomPhoneNumber();

      // Update user profile with the random phone number
      const userInfo = {
        email: result?.user?.email,
        phone: randomPhoneNumber,
        name: result?.user?.displayName,
        photoURL: result?.user?.photoURL,
      };

      await saveUser(userInfo);

      navigate(Form);
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a random phone number
  const generateRandomPhoneNumber = () => {
    const areaCode = Math.floor(100 + Math.random() * 900);
    const firstPart = Math.floor(100 + Math.random() * 900);
    const secondPart = Math.floor(1000 + Math.random() * 9000);
    return `${areaCode}-${firstPart}-${secondPart}`;
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first!");
    try {
      await resetPassword(email);
      toast.success(
        "Request Successful, Check your email for further process..."
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
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
                  onBlur={(e) => setEmail(e.target.value)}
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
                <span
                  onClick={handleResetPassword}
                  className="flex text-start text-xs hover:underline hover:text-rose-500 text-gray-400 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? <span className="loader"></span> : " Login"}
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
