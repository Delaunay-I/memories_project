import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({ currentId, setCurrentId }) => {
  const { posts } = useSelector((store) => store.posts);

  return !posts.length ? (
    <h2>No posts yet.</h2>
  ) : (
    <div className="mb-8 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;
