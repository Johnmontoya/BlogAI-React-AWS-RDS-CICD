import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import moment from "moment";
import { FaUserTie } from "react-icons/fa6";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { SlSocialGoogle } from "react-icons/sl";
import Loader from "../components/Loader";
import { useAppContext, type AppContextType } from "../context/appContext";
import toast from "react-hot-toast";
import axios from 'axios';

interface BlogData {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string | Date;
  description: string;
}

interface CommentData {
  name: string;
  content: string;
  createdAt: string | Date;
}

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { axios: axiosInstance } = useAppContext() as AppContextType;

  const [data, setData] = useState<BlogData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  const fetchBlogData = async () => {
    try {
      setLoading(true);      
      const { data } = await axios.get(`/api/blog/${id}`);      
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      console.error("Error en fetchBlogData:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async() => {
  try {
    const { data } = await axiosInstance.get(`/api/blog/comments?id=${id}`); // Query param
    
    if (data.success) {
      setComments(data.comments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const { data } = await axiosInstance.post('/api/blog/add-comment', { 
        blog: id, 
        name, 
        content 
      });
      
      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments(); // Recargar comentarios
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(getErrorMessage(error));
    }
  };

  console.log(comments)

  useEffect(() => {
    if (id) {
      fetchBlogData();
      fetchComments();
    }
  }, [id]);

  // Mostrar loader mientras carga
  if (loading) {
    return <Loader />;
  }

  // Mostrar mensaje si no se encuentra el blog
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog no encontrado</h1>
          <p className="text-gray-600 mb-6">El blog que buscas no existe.</p>
          <a 
            href="/" 
            className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-rose-600 py-4 font-medium">
          Published on {moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg mx-auto text-gray-600">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-rose-600/35 bg-rose-600/5 font-medium text-primary">
          Michael Brown
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <div
          className="rich-text max-w-3xl mx-auto prose prose-lg"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4 text-xl">Comments ({comments.length})</p>
          
          {comments.length > 0 ? (
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-rose-600/5 border border-rose-600/10 max-w-xl p-4 rounded-lg text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <FaUserTie className="w-6 h-6 text-rose-600" />
                    <p className="font-medium text-gray-800">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8 mt-2">{item.content}</p>
                  <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500">
                    {moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4 text-xl">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your name"
              required
              className="w-full p-3 border border-gray-300 rounded outline-none focus:border-rose-600 transition-colors"
            />
            <textarea
              placeholder="Your comment"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full p-3 border border-gray-300 rounded outline-none h-32 focus:border-rose-600 transition-colors resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-rose-600 text-white px-6 py-2.5 rounded hover:bg-rose-700 transition-colors font-medium"
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 text-lg">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <button className="hover:scale-110 transition-transform">
              <CiFacebook className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <CiTwitter className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <SlSocialGoogle className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;