import { useState } from "react";
import { blogCategories} from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext, type AppContextType } from "../context/appContext";

const BlogList = () => {
  const [menu, setMenu] = useState("Todo");
  const {blogs, input} = useAppContext() as AppContextType; // Si necesitas búsqueda

  const filteredBlogs = () => {
    let filtered = blogs;

    // Filtrar por búsqueda
    if (input !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (menu !== "Todo") {
      filtered = filtered.filter((blog) => blog.category === menu);
    }

    return filtered;
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-800 transition-colors ${
                menu === item ? "text-stone-100 px-4 pt-0.5" : "hover:text-rose-600"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-rose-600 rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filteredBlogs().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredBlogs().length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No blogs found</p>
          <p className="text-sm mt-2">
            {input ? `No results for "${input}"` : `No blogs in category "${menu}"`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;