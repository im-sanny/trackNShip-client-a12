import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { imageUpload } from "@/api/utils";

const ProfileAll = () => {
  const [role, isLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [displayName, setDisplayName] = useState(user.displayName || "");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = user.photoURL;
      if (profileImage) {
        // Upload image and get imageURL
        imageUrl = await imageUpload(profileImage);
      }

      // Update profile with new name or image
      await updateUserProfile(displayName, imageUrl);

      toast.success("Profile updated successfully");

      // Close the modal after updating
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = (e) => {
    // Set the selected profile image
    const file = e.target.files[0];
    setProfileImage(file);
  };

  if (loading || isLoading)
    return (
      <span className="loader flex justify-center items-center my-auto">
        Loading...
      </span>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-md h-32 w-32 border-2 border-white"
            />
          </a>
          <p className="p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="p-2 mt-4 rounded-lg flex justify-center mx-auto">
            <div className="flex text-center mx-auto flex-wrap items-center justify-center text-sm text-gray-600">
              <p className="flex flex-col w-full">
                Name
                <span className="font-bold text-black">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col w-full mt-1">
                Email
                <span className="font-bold text-black">{user?.email}</span>
              </p>
              <button
                className="bg-[#F43F5E] mt-1 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleProfileUpdate} className="w-full mt-4">
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                  <div className="flex flex-col w-full">
                    <label htmlFor="displayName" className="font-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="p-2 mt-1 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col w-full mt-4">
                    <label htmlFor="email" className="font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user?.email}
                      disabled
                      className="p-2 mt-1 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col w-full mt-4">
                    <label htmlFor="profilePicture" className="font-bold">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      onChange={handleImageChange}
                      className="p-2 mt-1 border rounded-md"
                    />
                  </div>
                  <div className="flex justify-between w-full mt-4">
                    <button
                      type="button"
                      className="bg-gray-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-gray-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAll;
