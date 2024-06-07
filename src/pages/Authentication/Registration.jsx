/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import bikeCourier from "@/assets/bikeCourier";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { imageUpload } from "@/api/utils";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone number is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
      );
    }),
});

const Registration = () => {
  // const axiosSecure = useAxiosSecure();
  const {
    setLoading,
    loading,
    createUser,
    signInWithGoogle,
    updateUserProfile,
  } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      // Upload image and get imageURL
      const image_url = await imageUpload(data.image[0]);

      // Registration
      const result = await createUser(
        data.email,
        data.password,
        data.phone,
        data.name,
        image_url
      );

      // Save name, and image in Firebase
      await updateUserProfile(data.name, image_url);

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
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg lg:max-w-4xl">
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center text-gray-600">
              Create an Account It's Free!
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/4"></span>

              <div className="text-xs text-center text-gray-500 uppercase hover:underline">
                Registration with Email and Password
              </div>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="mt-4">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  autoComplete="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  autoComplete="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                />

                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
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
              <FcGoogle size={20}></FcGoogle>
              Login with Google
            </Button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>

              <Link
                to="/login"
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                or log in
              </Link>

              <span className="w-1/5 border-b md:w-1/4"></span>
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
