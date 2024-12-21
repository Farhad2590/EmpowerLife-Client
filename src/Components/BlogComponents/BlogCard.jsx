import { AiOutlineDelete } from 'react-icons/ai';

const BlogCard = ({ post, onDelete, onReadMore, isAdmin }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-2">Category: {post.category}</p>
            <p className="text-gray-600 text-sm mt-2">{post.content.slice(0, 60)}...</p>
            <p className="text-gray-500 text-xs mt-2">Posted by: {post.writerName}</p>
            <p className="text-gray-500 text-xs">Date: {post.postedDate}</p>
            <div className="flex gap-2 mt-4">
                <button
                    className="flex-1 px-4 py-2 border border-[#68b5c2] text-[#68b5c2] font-semibold rounded hover:bg-teal-50 transition"
                    onClick={() => onReadMore(post)}
                >
                    Read More
                </button>
                {isAdmin && (
                    <button
                        onClick={() => onDelete(post._id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition flex items-center justify-center"
                        title="Delete post"
                    >
                        <AiOutlineDelete size={20} />
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default BlogCard;