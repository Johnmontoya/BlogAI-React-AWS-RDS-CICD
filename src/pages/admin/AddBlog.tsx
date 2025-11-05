import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const isQuillInitialized = useRef<boolean>(false); // Prevenir múltiples inicializaciones

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Startup");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const generateContent = async () => {
    if (!quillRef.current) return;
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = `
        <h2>Contenido generado por IA</h2>
        <p>Este es un contenido de ejemplo generado automáticamente basado en el título: <strong>${title}</strong></p>
        <p>Y el subtítulo: <em>${subTitle}</em></p>
      `;
      
      quillRef.current.root.innerHTML = generatedContent;
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Error al generar contenido. Por favor, intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!quillRef.current) {
      alert("El editor no está inicializado");
      return;
    }

    setIsSubmitting(true);

    try {
      const descripcion = quillRef.current.root.innerHTML;

      if (!descripcion || descripcion === '<p><br></p>') {
        alert("Por favor, escribe una descripción para el blog");
        setIsSubmitting(false);
        return;
      }

      const blogData = {
        titulo: title,
        subTitulo: subTitle,
        descripcion: descripcion,
        categoria: category,
        image: image,
        isPublished: isPublished,
        createdAt: new Date().toISOString(),
      };

      console.log("Blog data:", blogData);

      // Limpiar el formulario
      setTitle("");
      setSubTitle("");
      setCategory("Startup");
      setIsPublished(false);
      setImage(null);
      if (quillRef.current) {
        quillRef.current.root.innerHTML = "";
      }

      alert("¡Blog creado exitosamente!");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error al crear el blog. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Prevenir inicialización múltiple
    if (isQuillInitialized.current || !editorRef.current) {
      return;
    }

    // Inicializar Quill solo una vez
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

    isQuillInitialized.current = true;

    // Cleanup al desmontar
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
      isQuillInitialized.current = false;
    };
  }, []); // Array de dependencias vacío - ejecutar solo una vez

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
        <div className="max-w-lg min-h-[300px] pb-16 sm:pb-10 pt-2 relative">
          {/* Contenedor del editor - sin border aquí para evitar duplicación */}
          <div ref={editorRef} className="h-[250px] border border-gray-300 rounded"></div>
          <button
            type="button"
            onClick={generateContent}
            disabled={!title || !subTitle || isGenerating}
            className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-2 rounded hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin">⚙️</span>
                Generating...
              </>
            ) : (
              "Generate with AI ✨"
            )}
          </button>
        </div>
        {(!title || !subTitle) && (
          <p className="text-xs text-gray-500 mt-1">
            * Add title and subtitle to enable AI generation
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
          disabled={isSubmitting}
          className="mt-8 w-40 h-11 bg-rose-600 text-white rounded cursor-pointer text-sm font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;