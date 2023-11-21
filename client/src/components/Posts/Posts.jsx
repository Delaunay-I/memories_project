import { useSelector } from 'react-redux';

import Post from './Post/Post';

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return (
    !posts.length ? <h2>No posts yet.</h2> : (
      <div className="mb-6 grid grid-cols-2 gap-6">
        {posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    )
  )
}

export default Posts;