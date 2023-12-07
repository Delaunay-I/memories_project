import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "../../styles";
import { updatePost, createPost } from "../../features/post/postSlice";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((store) => {
    const { posts } = store.posts;
    return currentId ? posts.find((p) => p._id === currentId) : null;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost({id: currentId, updatedPost: postData}));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <div className="shadow-md bg-primary rounded-lg">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className="flex flex-col items-center mx-6 gap-4"
      >
        <h3 className="text-xl font-semibold mt-4">
          {currentId ? `Editing` : `Creating`} a Memory
        </h3>
        <input
          type="text"
          name="creator"
          placeholder="Creator"
          className={`${styles.formInput}`}
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          className={`${styles.formInput}`}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          className={`${styles.formInput}`}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          className={`${styles.formInput}`}
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className="flex flex-col">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <button type="submit" className={`${styles.colored_shadow_buttons}  ${styles.blue_gradient} my-3`}>
            Submit
          </button>
          <button
            onClick={clear}
            className={`${styles.colored_shadow_buttons} ${styles.red_gradient } mb-6`}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
