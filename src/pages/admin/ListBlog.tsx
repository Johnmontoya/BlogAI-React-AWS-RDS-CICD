import { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext, type AppContextType } from '../../context/appContext';
import toast from 'react-hot-toast';
import axios from 'axios';

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

const ListBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
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

    const fetchBlogs = async() => {
      try {
        const { data } = await axiosInstance.get('/api/admin/blogs')
        if (data.success) {
          setBlogs(data.blogs)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
        <h1>Todos los blogs</h1>
        <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className='w-full text-sm text-gray-500'>
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
                <th scope="col" className="px-2 py-4"> Titulo del blog </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Fecha </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Estados </th>
                <th scope="col" className="px-2 py-4"> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={
                  index + 1
                } />
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ListBlog