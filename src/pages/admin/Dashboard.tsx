import { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext, type AppContextType } from "../../context/appContext";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

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

  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get('/api/blog/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
          <p className="text-gray-400 font-light">Blogs</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
          <p className="text-gray-400 font-light">Comentarios</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
          <p className="text-gray-400 font-light">Borrador</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <p>Ultimos blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
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
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={index} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
