import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="
              w-full h-10 flex items-center justify-center gap-2.5 cursor-pointer
              bg-white text-[#1B1B1B] text-sm font-medium
              border border-[#E5E7EB] rounded-[6px]
              transition-all duration-200
              hover:bg-[#FCFCFA] hover:border-[#D1D5DB]
              active:scale-[0.99]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E4E50] focus-visible:ring-offset-2
            "
    >
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
