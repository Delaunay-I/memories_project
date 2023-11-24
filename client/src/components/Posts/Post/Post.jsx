import moment from "moment";
import likeIcon from "../../../images/like.png";
import deleteIcon from "../../../images/delete.png";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative max-w-md h-full grid gap-4 content-between bg-primary border border-gray-200 rounded-lg shadow hover:bg-gray-300">
      <button
        className="absolute z-10 top-0 right-0 text-white hover:bg-gray-600/[.4] focus:outline-none rounded-lg text-sm p-2"
        type="button"
        onClick={() => setCurrentId(post._id)}
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div className="absolute z-10 pl-4 mt-6 text-white">
        <h5 className="text-3xl font-semibold tracking-tight">
          {post.creator}
        </h5>
        <h6 className="text-xs">{moment(post.createdAt).fromNow()}</h6>
      </div>

      <img
        src={post.selectedFile}
        className="w-full h-44 brightness-50 rounded-t-lg overflow-hidden text-center bg-secondary object-cover"
      />

      <div className="m-2 flex flex-col justify-between gap-3">
        <p className="text-gray-600">{post.tags.map((tag) => `#${tag} `)}</p>
        <h6 className="text-4xl text-bold">{post.title}</h6>
        <p className="text-gray-600">{post.message}</p>
      </div>

      <div className="flex justify-between bg-slate-300 px-3">
        <button
          className="flex justify-between items-center space-x-1"
          onClick={() => dispatch(likePost(post._id))}
        >
          <img src={likeIcon} alt="thumb up" width={15} height={15} />
          <div>
            Like
            {post.likeCount}
          </div>
        </button>

        <button
          className="flex justify-between items-center space-x-1"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <img src={deleteIcon} alt="delete" width={15} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
