import { FaArrowRightLong } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useAppContext, type AppContextType } from "../context/appContext";
import Header from "./Header";

const Navbar = () => {
  const { navigate, token } = useAppContext() as AppContextType;

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-29 xl:mx-32 cursor-pointer">
      <div className="flex items-center justify-start gap-10">
        <img
          src={assets.Logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="w-12 sm:w-12"
        />
        <div className="lg:flex hidden gap-2 text-2xl font-light">
          <h2>
          El Crisol de las {" "}
        </h2>
        <span className="text-rose-600"> Ideas</span>
          </div>
      </div>

      <Header />

      <button
        className="flex items-center gap-2 rounded-full bg-rose-600 text-sm cursor-pointer text-stone-50 px-10 py-2.5"
        onClick={() => navigate("/admin")}
      >
        {token ? "Dashboard" : "Login"}
        <FaArrowRightLong className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;

// text-sm cursor-pointer bg-primary
