import { FaRegStar } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="w-full m-auto h-[460px] bg-slate-900">
      <div className="max-w-7xl h-full p-10 m-auto">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-stone-200/40 bg-stone-20/10 rounded-full text-sm text-stone-200">
        <p> Nueva funcion de IA integrada </p>
        <FaRegStar className="w-2.5" />
      </div>
      <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-300">
        Un blog <span className="text-rose-700"> especial </span> <br />{" "}
        para tí
      </h1>
      <p className="my-6 sm:my-8 max-w-2xl max-sm:text-xs text-gray-400 justify-start">
        Un punto de encuentro para mentes curiosas. Información valiosa, análisis profundos e ideas que transforman. 
        La conversación empieza ahora.
      </p>
      </div>
    </div>
  );
};

export default Banner;
