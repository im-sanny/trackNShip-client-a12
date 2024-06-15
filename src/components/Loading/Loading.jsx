import Lottie from "lottie-react";
import loading from "@/assets/loading.json";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center my-auto items-center">
        <Lottie animationData={loading} ></Lottie>
      </div>
    </div>
  );
};

export default Loading;
