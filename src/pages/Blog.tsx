import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogData, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import { FaUserTie } from "react-icons/fa6";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { SlSocialGoogle } from "react-icons/sl";
import Loader from "../components/Loader";

interface BlogData {
  id: string;
  titulo: string;
  subTitulo: string;
  createdAt: string | Date;
  descripcion: string;
}

interface CommentData {
  name: string;
  content: string;
  createdAt: string | Date;
}

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BlogData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);

  // Corregido: estos deben ser strings, no BlogData
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchBlogData = async () => {
    if (id) {
      const blogPost = blogData.find((item) => item.id === id);
      setData(blogPost || null);
    }
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  // Corregido: tipo del evento
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para añadir el comentario
    const newComment: CommentData = {
      name,
      content,
      createdAt: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    
    // Limpiar el formulario
    setName("");
    setContent("");
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]); // Agregada dependencia 'id'

  return data ? (
    <div>
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-rose-600 py-4 font-medium">
          Published on {moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.titulo}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitulo}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-rose-600/35 bg-rose-600/5 font-medium text-primary">
          Michael Brown {/* Corregido: "Michales" -> "Michael" */}
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6"> {/* Corregido: max-2-5xl -> max-w-5xl */}
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.descripcion }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto"> {/* Corregido: max-2-3xl -> max-w-3xl */}
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-rose-600/2 border border-rose-600/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2"> {/* Agregado flex para alinear */}
                  <FaUserTie className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8 mt-2">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              placeholder="Comment"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 transition-colors"
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <CiFacebook className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
            <CiTwitter className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
            <SlSocialGoogle className="w-8 h-8 cursor-pointer hover:text-rose-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
