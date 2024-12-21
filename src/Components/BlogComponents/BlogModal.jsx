import { AiOutlineClose } from 'react-icons/ai';
const BlogModal = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#68b5c2]">{post.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#68b5c2] transition"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="mt-4 w-full h-64 object-cover rounded"
        />
        <p className="mt-4 text-sm">{post.content}</p>
        <p className="text-xs text-gray-500 mt-4">
          Posted by {post.writerName} on {post.postedDate}
        </p>
      </div>
    </div>
  );
export default BlogModal;