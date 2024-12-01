import { useState } from "react";
import { Camera, Edit2, User, Mail } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { imageUpload } from "@/api/utils";
import Loading from "@/components/Loading/Loading";

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
        imageUrl = await imageUpload(profileImage);
      }

      await updateUserProfile(displayName, imageUrl);
      toast.success("Profile updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <div className="relative w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-105">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-pink-500 to-purple-600 opacity-80"></div>

          {/* Profile Image Container */}
          <div className="relative z-10 flex justify-center">
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 text-center">
            <div className="mb-4">
              <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs tracking-wide uppercase">
                {role}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <User size={20} className="text-pink-500" />
                <span className="font-semibold">{user?.displayName}</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <Mail size={20} className="text-pink-500" />
                <span>{user?.email}</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span className="text-sm text-gray-500">User ID: {user?.uid}</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
            >
              <Edit2 size={18} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-pink-50 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-pink-100"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
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
