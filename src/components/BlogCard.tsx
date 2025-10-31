import { useNavigate } from "react-router-dom";

interface Blog {
  id: string | number;
  titulo: string;
  descripcion: string;
  categoria: string;
  image: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { titulo, descripcion, categoria, image, id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
    >
      <img src={image} alt="" className="aspect-video" />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-rose-600/20 rounded-full text-stone-100 text-xs">
        {categoria}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{titulo}</h5>
        <p className="mb-3 text-xs text-gray-600">{descripcion.slice(0, 80)}</p>
      </div>
    </div>
  );
};

export default BlogCard;
