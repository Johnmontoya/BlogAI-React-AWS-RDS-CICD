import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Aquí iría tu lógica de autenticación
      // Ejemplo:
      // const response = await loginUser(email, password);
      // if (response.success) {
      //   // Guardar token y redirigir al dashboard
      //   localStorage.setItem('adminToken', response.token);
      //   navigate('/admin/dashboard');
      // }

      console.log("Login attempt with:", { email, password });
      
      // Simulación de login (reemplazar con tu lógica real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ejemplo de validación básica
      if (email === "admin@example.com" && password === "password123") {
        console.log("Login successful");
        // Redirigir al dashboard
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
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
              Enter your credentials to access the admin panel
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
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 outline-none focus:border-rose-600 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="your password"
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
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
