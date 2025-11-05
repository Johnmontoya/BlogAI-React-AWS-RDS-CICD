import { useEffect, useState } from "react";
import { comments_data, blogData } from "../../assets/assets";
import CommenTableItem from "../../components/admin/CommenTableItem";

// Interfaz actualizada según la estructura real de tus datos
interface Comment {
  _id: string;
  blog: string; // Referencia al blog (ej: "blog_data[0]")
  name: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interfaz para el comentario enriquecido con info del blog
interface EnrichedComment extends Comment {
  blogInfo?: {
    id: string;
    titulo: string;
  };
}

type FilterType = "Approved" | "Not Approved";

const Comments = () => {
  const [comments, setComments] = useState<EnrichedComment[]>([]);
  const [filter, setFilter] = useState<FilterType>("Not Approved");

  const fetchComments = async () => {
    // Enriquecer los comentarios con información del blog
    const enrichedComments = comments_data.map(comment => {
      // Extraer el índice del blog desde la referencia (ej: "blog_data[0]" -> 0)
      const blogIndexMatch = comment.blog.match(/\[(\d+)\]/);
      const blogIndex = blogIndexMatch ? parseInt(blogIndexMatch[1]) : null;
      
      // Obtener la información del blog si existe el índice
      const blogInfo = blogIndex !== null && blogData[blogIndex] 
        ? {
            id: blogData[blogIndex].id,
            titulo: blogData[blogIndex].titulo
          }
        : undefined;

      return {
        ...comment,
        blogInfo
      };
    });

    setComments(enrichedComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter(comment =>
    filter === "Approved" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <div className="flex justify-between items-center max-w-6xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "Approved" 
                ? "text-rose-600 border-rose-600 bg-rose-50" 
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Approved ({comments.filter(c => c.isApproved).length})
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-sm border rounded-full px-4 py-1.5 cursor-pointer text-xs transition-colors font-medium ${
              filter === "Not Approved" 
                ? "text-rose-600 border-rose-600 bg-rose-50" 
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            Not Approved ({comments.filter(c => !c.isApproved).length})
          </button>
        </div>
      </div>

      <div className="relative max-w-6xl overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
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
            <p className="text-lg font-medium">No {filter.toLowerCase()} comments found</p>
            <p className="text-sm mt-2">
              {filter === "Approved" 
                ? "There are no approved comments yet." 
                : "All comments have been approved!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;