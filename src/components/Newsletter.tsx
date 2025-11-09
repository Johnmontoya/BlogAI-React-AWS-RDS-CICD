const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Dejanos tu email.</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Suscribete para que no te pierdas los ultimos blogs y noticias exclusivas.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Ingresa tu email"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-rose-600/80 hover:bg-rose-600 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Suscribete
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
