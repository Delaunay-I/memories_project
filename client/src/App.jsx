import { useState } from "react";
// import { useDispatch } from "react-redux";

// import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";

import { useGetPostsQuery } from "./features/api/apiSlice";

function App() {
  const [currentId, setCurrentId] = useState(null);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const { data: posts, isFetching, isSuccess } = useGetPostsQuery();
  if (isSuccess) {
    console.log(`RTK query:`, posts);
  } else {
    console.log(`not fetched`);

  }


  return (
    <div className="relative flex flex-col items-center">
      <nav className="my-4 w-4/5 flex items-center justify-center py-6 rounded-lg shadow-xl h-20 bg-primary">
        <h2 className="text-4xl">Memories </h2>
        <img src={memories} alt="memories" className="ml-4 h-16" />
      </nav>

      <section className="mt-8 px-8 flex sm:flex-row flex-col-reverse sm:items-start items-center  gap-4">
        <Posts setCurrentId={setCurrentId} />
        <div className="">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </section>
    </div>
  );
}

export default App;
