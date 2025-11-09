import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext, type AppContextType } from "../../context/appContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddBlog = () => {
  const { axios: axiosInstance } = useAppContext() as AppContextType;

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Startup");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success && quillRef.current) {
        quillRef.current.root.innerHTML = data.content;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quillRef.current) {
      toast.error("El editor no está inicializado");
      return;
    }

    setIsAdding(true);

    try {
      const description = quillRef.current.root.innerHTML;

      if (!description || description === "<p><br></p>") {
        toast.error("Por favor, escribe una descripción para el blog");
        setIsAdding(false);
        return;
      }

      const blogData = {
        title,
        subTitle,
        description,
        category,
        image,
        isPublished,
        createdAt: new Date().toISOString(),
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blogData));
      formData.append("image", image!);

      const { data } = await axiosInstance.post(`/api/blog/add`, formData);

      if (data.success) {
        toast.success(data.message);
        // Limpiar el formulario
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        setImage(null);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    // Inicializar Quill solo si no existe y el ref está disponible
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Escribe tu contenido aquí...",
      });
    }

    // Cleanup al desmontar el componente
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 min-h-screen overflow-auto"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Blog</h1>

        <p className="font-medium mb-2">Upload thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={!image ? assets.Upload_area : URL.createObjectURL(image)}
            alt="Upload preview"
            className="mt-2 h-32 w-32 object-cover rounded border-2 border-dashed border-gray-300 hover:border-rose-600 transition-colors"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          id="image"
          hidden
          required
        />

        <p className="mt-6 font-medium mb-2">Blog Title</p>
        <input
          type="text"
          placeholder="Enter blog title"
          required
          className="w-full max-w-lg mt-2 p-3 border border-gray-300 outline-none rounded focus:border-rose-600 transition-colors"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-6 font-medium mb-2">Sub Title</p>
        <input
          type="text"
          placeholder="Enter blog subtitle"
          required
          className="w-full max-w-lg mt-2 p-3 border border-gray-300 outline-none rounded focus:border-rose-600 transition-colors"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-6 font-medium mb-2">Blog Description</p>
        <div className="max-w-lg pb-16 sm:pb-10 relative">
          {/* Contenedor del editor - Quill agregará su propia estructura */}
          <div
            ref={editorRef}
            className="min-h-[250px] border border-gray-300 rounded overflow-hidden"
          />
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          
          <button
            type="button"
            onClick={generateContent}
            disabled={loading || !title}
            className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-2 rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 z-10"
          >
            {loading ? (
              <>
                <span className="animate-spin">⚙️</span>
                Generating...
              </>
            ) : (
              "Generate with AI ✨"
            )}
          </button>
        </div>
        
        {!title && (
          <p className="text-xs text-gray-500 mt-1">
            * Add title to enable AI generation
          </p>
        )}

        <p className="mt-6 font-medium mb-2">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className="mt-2 px-4 py-2.5 text-gray-700 border border-gray-300 outline-none rounded focus:border-rose-600 transition-colors cursor-pointer"
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            className="w-5 h-5 cursor-pointer accent-rose-600"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="font-medium cursor-pointer">
            Publish Now
          </label>
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 h-11 bg-rose-600 text-white rounded cursor-pointer text-sm font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;