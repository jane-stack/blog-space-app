import { createContext, useState, useEffect } from "react";

const BlogContext = createContext([]);

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs')
        .then(resp => resp.json())
        .then(data => {
            setBlogs(data)
        })
    }, [])

    const addBlog = blog => {
        setBlogs([...blogs, blog]);
    }

    const editBlog = newBlog => {
        const updatedBlogs = blogs.map(blog => {
            if(newBlog.id === blog.id) {
                return newBlog;
            } else {
                return blog;
            }
        })
        setBlogs(updatedBlogs);
    }

    const deleteBlog = deleteBlog => {
        const updatedBlogs = blogs.filter(blog => blog.id !== deleteBlog.id)
        setBlogs(updatedBlogs)
    }

    return <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog }}>{ children }</BlogContext.Provider>
}

export { BlogContext, BlogProvider };