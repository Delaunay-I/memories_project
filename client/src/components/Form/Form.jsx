import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

import { styles } from "../../styles";
import { createPost } from "../../actions/posts";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost(postData));
  };

  const clear = () => {};

  return (
    <div className="shadow-md bg-primary rounded-lg">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className="flex flex-col items-center mx-6 gap-4"
      >
        <h3 className="text-xl font-semibold mt-4">Creating a Memory</h3>
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
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />

        <div className="flex flex-col">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <button type="submit" className={`${styles.button} my-3 bg-blue-600`}>
            Submit
          </button>
          <button
            onClick={clear}
            className={`${styles.button} mb-6 bg-rose-600`}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
