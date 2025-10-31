import { FaArrowRightLong } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-29 xl:mx-32 cursor-pointer">
      <img
        src={assets.Logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="w-28 sm:w-36"
      />
      <button
        className="flex items-center gap-2 rounded-full bg-rose-600 text-sm cursor-pointer text-stone-50 px-10 py-2.5"
        onClick={() => navigate("/admin")}
      >
        Login
        <FaArrowRightLong className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;

// text-sm cursor-pointer bg-primary