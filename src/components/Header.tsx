import { FaRegStar } from "react-icons/fa6";
import { useAppContext, type AppContextType } from "../context/appContext";
import { useRef } from "react";

const Header = () => {

  const {setInput, input} = useAppContext() as AppContextType;
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setInput(inputRef.current.value);
    }
  }

  const onClear = () => {
    setInput('')
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p> New: AI feature integrated </p>
          <FaRegStar className="w-2.5" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary"> blogging </span> <br />{" "}
          platform
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          "This is your space to think out loud, to shate what matters, and to write without filters. 
        Whether it-s one word or a thousand, your story starts right here"
        </p>

        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-stone-100 rounded overglow-hidden">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-rose-600 text-stone-100 px-8 py-2 m-1.5 rounded hover:scale105 transform-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="text-center">
        {
          input && <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">
          Clear Search
        </button>
        }
      </div>
    </div>
  );
};

export default Header;
