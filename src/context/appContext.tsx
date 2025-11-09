import { createContext, useContext, useEffect, useState } from "react";
import axios, { type AxiosInstance } from 'axios';
import { useNavigate, type NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;

interface Blog {
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

export interface AppContextType {
    axios: AxiosInstance;
    navigate: NavigateFunction;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    blogs: Blog[];
    setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    fetchBlogs: () => Promise<void>; // Función de utilidad
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [input, setInput] = useState<string>("");

    const fetchBlogs = async () => {
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            // Aseguramos que el error sea manejable
            const errorMessage = axios.isAxiosError(error) ? error.message : "An unexpected error occurred";
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, []);    

    const value: AppContextType = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput, fetchBlogs
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}