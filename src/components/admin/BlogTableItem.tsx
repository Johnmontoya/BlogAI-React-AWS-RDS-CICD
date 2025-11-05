import React from "react";

export interface Blog {
  id: string;
  titulo: string;
  subTitulo: string;
  descripcion: string;
  categoria: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogTableItemProps {
  blog: Blog;
  fetchBlogs: () => void | Promise<void>;
  index: number;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
  const { titulo, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const handleTogglePublish = async () => {
    try {
      await fetchBlogs();
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  return (
    <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors">
      <th scope="row" className="px-2 py-4 font-medium text-gray-900">
        {index}
      </th>
      <td className="px-2 py-4">{titulo}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`font-medium ${
            isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4">
        <div className="flex text-xs gap-3">
          <button
            onClick={handleTogglePublish}
            className={`border px-3 py-1.5 rounded cursor-pointer transition-colors hover:shadow-md ${
              isPublished
                ? "border-orange-600 text-orange-700 hover:bg-orange-50"
                : "border-green-600 text-green-700 hover:bg-green-50"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
