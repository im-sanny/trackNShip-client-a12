import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
import { axiosCommon } from "@/hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user and save to backend
  const createUser = async (email, password, phone, name, photoURL) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    await saveUser({ email, phone, name, photoURL });
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
  };

  // Reset password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Log out and clear token
  // const logOut = async () => {
  //   setLoading(true);
  //   await signOut(auth);
  //   localStorage.removeItem("access-token");
  // };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      // Remove the token from local storage
      localStorage.removeItem("access-token");

      // Optionally navigate to the login page or home page
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Save user to backend
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      role: "user",
      status: "Verified",
      image: user?.photoURL,
      number: user?.phone,
      name: user?.name,
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/user`,
      currentUser
    );
    return data;
  };

  // On auth state change, get JWT and save to localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          const { data } = await axiosCommon.post("/jwt", userInfo);
          if (data.token) {
            localStorage.setItem("access-token", data.token);
          }
        } catch (error) {
          console.error("Error fetching JWT:", error);
        }
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    saveUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
