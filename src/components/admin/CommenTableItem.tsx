import { CiStickyNote } from "react-icons/ci";

// Interfaz actualizada según la estructura real de datos
interface BlogInfo {
  id: string;
  titulo: string; // Cambiado de 'title' a 'titulo' según tus datos
}

interface Comment {
  _id: string;
  blog: string; // La referencia original (ej: "blog_data[0]")
  name: string;
  content: string;
  createdAt: string | Date;
  isApproved: boolean;
  blogInfo?: BlogInfo; // Información enriquecida del blog (opcional)
}

interface CommentTableItemProps {
  comment: Comment;
  fetchComments: () => void | Promise<void>;
  index?: number; // Opcional, si quieres mostrar números
}

const CommenTableItem: React.FC<CommentTableItemProps> = ({ 
  comment, 
  fetchComments,
  index 
}) => {
  const { blogInfo, createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  const handleApproveComment = async () => {
    try {
      // Aquí iría la lógica real para aprobar el comentario
      // Por ejemplo: await approveComment(_id);
      
      console.log(`Approving comment ${_id}`);
      
      // Por ahora, solo recargamos los comentarios
      // En producción, harías una llamada al backend primero
      await fetchComments();
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const handleUnapproveComment = async () => {
    try {
      console.log(`Unapproving comment ${_id}`);
      await fetchComments();
    } catch (error) {
      console.error("Error unapproving comment:", error);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-600">Blog:</span>{" "}
            <span className="text-gray-800">
              {blogInfo?.titulo || "Unknown Blog"}
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
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!isApproved ? (
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