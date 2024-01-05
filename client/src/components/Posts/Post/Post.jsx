import moment from "moment";
import likeIcon from "../../../images/like.png";
import deleteIcon from "../../../images/delete.png";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../features/post/postSlice";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return <>&nbsp;Like</>;
  };


  return (
    <div className="relative flex w-[18rem] flex-col rounded-xl bg-primary shadow-md">
      {(user?.sub === post?.creator ||
          user?._id === post?.creator) && (
      <button
        className="absolute z-10 top-0 right-0 text-white transition duration-300 ease-in-out hover:bg-zinc-700/[.4] focus:outline-none rounded-full text-sm p-2"
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
          )}

      <div className="absolute z-10 pl-4 mt-6 text-white">
        <h5 className="text-3xl font-semibold tracking-tight">{post.name}</h5>
        <h6 className="text-xs">{moment(post.createdAt).fromNow()}</h6>
      </div>

      <img
        src={post.selectedFile}
        className="w-full h-44 brightness-50 overflow-hidden rounded-t-lg bg-transparent bg-clip-border bg-secondary object-cover"
      />

      <div className="m-2 flex flex-col justify-between gap-3 antialiased">
        <p className="text-gray-600 text-xs">
          {post.tags.map((tag) => `#${tag} `)}
        </p>
        <h6 className="text-stone-900 text-2xl font-semibold leading-snug">
          {post.title}
        </h6>
        <p className="leading-relaxed text-gray-700">{post.message}</p>
      </div>

      <div className="flex justify-between p-6">
        <button
          className="flex justify-between items-center space-x-1"
          onClick={() => dispatch(likePost(post._id))}
        >
          <img src={likeIcon} alt="thumb up" width={15} height={15} />
          <div>
            <Likes />
          </div>
        </button>
      {  console.log('post', post)}
        {(user?.sub === post?.creator ||
          user?._id === post?.creator) && (
          <button
            className="flex justify-between items-center space-x-1"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <img src={deleteIcon} alt="delete" width={15} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
