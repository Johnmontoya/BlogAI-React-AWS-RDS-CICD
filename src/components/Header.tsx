import { useAppContext, type AppContextType } from "../context/appContext";
import { useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

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

      <div className="text-center">        

        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-stone-100 rounded overglow-hidden">
          <input
            type="text"
            ref={inputRef}
            placeholder="Buscar blog"
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
          input && <button onClick={onClear} className="absolute border font-light mt-6 text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer bg-white">
          <IoIosCloseCircleOutline size={18} />
        </button>
        }
      </div>
    </div>
  );
};

export default Header;
