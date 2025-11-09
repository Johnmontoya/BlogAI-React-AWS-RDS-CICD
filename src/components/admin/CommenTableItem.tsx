import axios from "axios";
import { CiStickyNote } from "react-icons/ci";
import { useAppContext, type AppContextType } from "../../context/appContext";
import toast from "react-hot-toast";

// Interfaz actualizada según la estructura real de datos
interface BlogInfo {
  _id: string;
  title: string; // Cambiado de 'title' a 'titulo' según tus datos
}

interface Comment {
  _id: string;
  blog: BlogInfo; // La referencia original (ej: "blog_data[0]")
  name: string;
  content: string;
  createdAt: string | Date;
  isApproved: boolean;
}

interface CommentTableItemProps {
  comment: Comment;
  fetchComments: () => void | Promise<void>;
  index?: number; // Opcional, si quieres mostrar números
}

const CommenTableItem: React.FC<CommentTableItemProps> = ({
  comment,
  fetchComments,
  index,
}) => {
  const { createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

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

  const handleApproveComment = async () => {
    try {
      const { data } = await axiosInstance.post('/api/admin/approve-comment', {id: _id})

      if(data.success) {
        toast.success(data.message)
        await fetchComments();
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  };

  const handleUnapproveComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?')
      if(!confirm) return;

      const { data } = await axiosInstance.post('/api/admin/delete-comment', {id: _id})

      if(data.success) {
        toast.success(data.message)
        await fetchComments();
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-600">Blog:</span>{" "}
            <span className="text-gray-800">
              {comment.blog?.title || "Unknown Blog"}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-600">Name:</span>{" "}
            <span className="text-gray-800">{name}</span>
          </p>
          <p>
            <span className="font-medium text-gray-600">Comment:</span>{" "}
            <span className="text-gray-800">{content}</span>
          </p>
        </div>
      </td>
      <td className="px-6 py-4 max-sm:hidden text-gray-600">
        <div className="flex flex-col">
          <span>{BlogDate.toLocaleDateString()}</span>
          <span className="text-xs text-gray-400">
            {BlogDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!comment.isApproved ? (
            <button
              onClick={handleApproveComment}
              className="group flex items-center gap-2 px-3 py-1.5 border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors"
              aria-label="Approve comment"
              title="Click to approve"
            >
              <CiStickyNote className="w-4 h-4" />
              <span className="text-xs font-medium">Approve</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-block text-xs border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1 font-medium">
                Approved
              </span>
              <button
                onClick={handleUnapproveComment}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                title="Click to unapprove"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommenTableItem;
