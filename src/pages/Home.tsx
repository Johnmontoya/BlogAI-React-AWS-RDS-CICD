import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Blog = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <BlogList />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Blog;