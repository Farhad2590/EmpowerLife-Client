import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import UseAdmin from '../hooks/useAdmin';
import UseWriter from '../hooks/UseWriter';

import DynamicHeader from '../Components/SharedComponets/DynamicHeader';
import BlogCard from '../Components/BlogComponents/BlogCard'
import BlogForm from '../Components/BlogComponents/BlogForm';
import BlogModal from '../Components/BlogComponents/BlogModal';

const BlogPage = () => {
  const { user } = useAuth();
  const [isAdmin] = UseAdmin();
  const [isWriter] = UseWriter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allBlogs`);
      setBlogPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleAddPost = async (formData) => {
    const postData = {
      ...formData,
      writerName: user.name,
      writerEmail: user.email,
      postedDate: new Date().toLocaleDateString(),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, postData);
      if (response.status === 200) {
        setBlogPosts([...blogPosts, postData]);
        alert('Blog post added successfully!');
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
      alert('Failed to add blog post. Please try again.');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteBlogs/${postId}`);
      setBlogPosts(blogPosts.filter(post => post._id !== postId));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <DynamicHeader title="Blogs" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${isWriter ? '' : 'md:col-span-2'}`}>
          <h2 className="text-2xl font-semibold text-[#68b5c2] mb-4">Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                onDelete={handleDeletePost}
                onReadMore={(post) => {
                  setSelectedPost(post);
                  setOpenModal(true);
                }}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>

        {isWriter && (
          <div>
            <h2 className="text-2xl font-semibold text-[#68b5c2] mb-4">Write Blog Post</h2>
            <BlogForm onSubmit={handleAddPost} />
          </div>
        )}
      </div>

      {openModal && selectedPost && (
        <BlogModal
          post={selectedPost}
          onClose={() => {
            setOpenModal(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default BlogPage;