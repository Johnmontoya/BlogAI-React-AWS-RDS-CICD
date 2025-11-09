import { useEffect, useState } from "react";
import CommenTableItem from "../../components/admin/CommenTableItem";
import { useAppContext, type AppContextType } from "../../context/appContext";
import axios from "axios";
import toast from "react-hot-toast";

// Interfaz actualizada según la estructura real de datos
interface BlogInfo {
  _id: string;
  title: string; // Cambiado de 'title' a 'titulo' según tus datos
}

// Interfaz actualizada según la estructura real de tus datos
interface Comment {
  _id: string;
  blog: BlogInfo; // Referencia al blog (ej: "blog_data[0]")
  name: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type FilterType = "Aprobado" | "No aprobado";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<FilterType>("No aprobado");

  const {axios: axiosInstance} = useAppContext() as AppContextType;

  // Función de utilidad para manejar errores de Axios
    const getErrorMessage = (err: unknown): string => {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          return err.response.data.message;
        }
        return err.message;
      }
      return "An unexpected error occurred.";
    };

  const fetchComments = async () => {
    try {
      const { data } = await axiosInstance.get('/api/blog/comments/all')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  };  

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter(comment =>
    filter === "Aprobado" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <div className="flex justify-between items-center max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Comentarios</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Aprobado")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "Aprobado" 
                ? "text-rose-600 border-rose-600 bg-rose-50" 
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Aprobado ({comments.filter(c => c.isApproved).length})
          </button>

          <button
            onClick={() => setFilter("No aprobado")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "No aprobado" 
                ? "text-rose-600 border-rose-600 bg-rose-50" 
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            No Aprobado ({comments.filter(c => !c.isApproved).length})
          </button>
        </div>
      </div>

      <div className="relative max-w-6xl overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titulo del blog y Comentarios
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredComments.map((comment, index) => (
              <CommenTableItem
                key={comment._id}
                comment={comment}
                index={index + 1}
                fetchComments={fetchComments}
              />
            ))}
          </tbody>
        </table>

        {filteredComments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">{filter.toLowerCase()} comentarios no encontrados</p>
            <p className="text-sm mt-2">
              {filter === "Aprobado" 
                ? "No hay comentarios aprobados todavia." 
                : "Todos los comentarios han sido aprobados!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;