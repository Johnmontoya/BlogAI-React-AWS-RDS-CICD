import React, { useState } from "react";
import { useAppContext, type AppContextType } from "../../context/appContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login: React.FC = () => {

  const {axios: axiosInstance, setToken} = useAppContext() as AppContextType;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const {data} = await axios.post('/api/admin/login', {email, password});

      if(data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axiosInstance.defaults.headers.common['Authorization'] = data.token;
      } else {
        toast.error(data.message);
      }

    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(err)) {
        // Si hay una respuesta del servidor (código 4xx, 5xx)
        if (err.response && err.response.data && err.response.data.message) {
          // El error más específico del backend
          errorMessage = err.response.data.message;
        } else if (err.message) {
          // Error de red (ej: desconexión) o timeout
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        // Si es un error de JavaScript estándar (no de Axios)
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-rose-600">Admin</span> Login
            </h1>
            <p className="font-light text-gray-600 mt-2">
              Ingresa tus credenciales para ingresar al panel de administración
            </p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full text-gray-600"
          >
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-2 font-medium">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="ingresa tu email"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-rose-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="ingresa tu contraseña"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-rose-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium bg-rose-600 text-white rounded cursor-pointer hover:bg-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Link opcional para recuperar contraseña */}
          <div className="mt-4 text-center">
            
              <a href="#"
              className="text-sm text-rose-600 hover:underline"
            >
              Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
