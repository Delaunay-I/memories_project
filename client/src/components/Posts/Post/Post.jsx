import moment from "moment";
import likeIcon from "../../../images/like.png";
import deleteIcon from "../../../images/delete.png";

const Post = ({ post }) => {
  return (
    <div className="max-w-md h-full grid gap-4 content-between bg-primary border border-gray-200 rounded-lg shadow hover:bg-gray-300">
      <div className="absolute z-10 pl-4 mt-6 text-white">
        <h5 className="text-3xl font-semibold tracking-tight">
          {post.creator}
        </h5>
        <h6 className="text-xs">{moment(post.created).fromNow()}</h6>
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

      <div>
        <button className="" onClick={() => {}}>
          <img src="" alt="" />
        </button>
      </div>

      <div className="flex justify-between bg-slate-300 px-3">
        <button
          className="flex justify-between items-center space-x-1"
          onClick={() => {}}
        >
          <img src={likeIcon} alt="thumb up" width={15} height={15} />
          <div>
            Like
            {post.likeCount}
          </div>
        </button>

        <button
          className="flex justify-between items-center space-x-1"
          onClick={() => {}}
        >
          <img src={deleteIcon} alt="delete" width={15} />
          <div>Delete</div>
        </button>
      </div>
    </div>
  );
};

export default Post;
