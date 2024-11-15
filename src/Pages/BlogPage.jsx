import  { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import DynamicHeader from '../Components/SharedComponets/DynamicHeader';

const BlogPage = () => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  
  const [selectedPost, setSelectedPost] = useState(null);

  const [blogPosts, setBlogPosts] = useState([
    {
      title: 'The Importance of Sleep',
      content: "Getting enough quality sleep is crucial for our physical and mental well-being...",
      image: 'https://i.ibb.co/X5JNGW6/sleep.jpg',
    },
    {
      title: 'Sustainable Living: Small Steps Towards a Greener Future',
      content: "Climate change is a pressing issue, and we all have a role to play...",
      image: 'https://i.ibb.co/wYNqjCm/tree.jpg',
    },
    {
      title: 'The Art of Mindfulness: Achieving Inner Peace',
      content: "In our fast-paced world, mindfulness practices can help...",
      image: 'https://i.ibb.co/C6DFZRx/meditation.jpg',
    },
  ]);

  const handleNewPostTitleChange = (e) => setNewPostTitle(e.target.value);
  const handleNewPostContentChange = (e) => setNewPostContent(e.target.value);
  const handleNewPostImageChange = (e) => setNewPostImage(e.target.value);

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim() && newPostImage.trim()) {
      setBlogPosts([
        ...blogPosts,
        { title: newPostTitle, content: newPostContent, image: newPostImage },
      ]);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImage('');
    }
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* <h1 className="text-3xl font-bold text-[#68b5c2] mb-8">Blogs</h1> */}
      <DynamicHeader title="Blogs"/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blog Posts */}
        <div>
          <h2 className="text-2xl font-semibold text-[#68b5c2] mb-4">Blog Posts</h2>
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.content.slice(0, 60)}...</p>
                <button
                  className="mt-4 px-4 py-2 border border-[#68b5c2] text-[#68b5c2] font-semibold rounded hover:bg-teal-50 transition"
                  onClick={() => handleReadMore(post)}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Blog */}
        <div>
          <h2 className="text-2xl font-semibold text-[#68b5c2] mb-4">Write a Blog Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newPostTitle}
            onChange={handleNewPostTitleChange}
            className="w-full mb-4 p-2 border rounded focus:ring focus:ring-[#68b5c2]"
          />
          <textarea
            placeholder="Content"
            value={newPostContent}
            onChange={handleNewPostContentChange}
            rows="5"
            className="w-full mb-4 p-2 border rounded focus:ring focus:ring-[#68b5c2]"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPostImage}
            onChange={handleNewPostImageChange}
            className="w-full mb-4 p-2 border rounded focus:ring focus:ring-[#68b5c2]"
          />
          <button
            onClick={handleCreatePost}
            className="w-full bg-[#68b5c2] text-white py-2 rounded font-semibold hover:bg-teal-700 transition">
            Create Post
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#68b5c2]">{selectedPost.title}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-[#68b5c2]">
                <AiOutlineClose size={20} />
              </button>
            </div>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="mt-4 w-full rounded"
            />
            <p className="mt-4 text-gray-700">{selectedPost.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
