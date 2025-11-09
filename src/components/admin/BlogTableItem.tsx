import React from "react";
import { useAppContext, type AppContextType } from "../../context/appContext";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

export interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
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
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const { axios: axiosInstance } = useAppContext() as AppContextType;

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

  const deleteBlog = async() => {
    const confirm = window.confirm('Are you sure you want to delete this blog?')
    if(!confirm) return
    try {
      const { data } = await axiosInstance.post('/api/blog/delete', { id: blog._id})
      if(data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const handleTogglePublish = async () => {
    try {
      const {data} = await axiosInstance.post('/api/blog/toggle-publish', {id: blog._id})
      if(data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors">
      <th scope="row" className="px-2 py-4 font-medium text-gray-900">
        {index}
      </th>
      <td className="px-2 py-4">{title}</td>
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
              blog.isPublished
                ? "border-orange-600 text-orange-700 hover:bg-orange-50"
                : "border-green-600 text-green-700 hover:bg-green-50"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <AiOutlineDelete size={28} onClick={deleteBlog} className="hover:scale-110 transition-all cursor-pointer" />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
