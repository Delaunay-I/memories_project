import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";

import { styles } from "./styles";

function App() {
const dispatch = useDispatch();

useEffect(() => {
  dispatch(getPosts());
}, [dispatch]);

  return (
    <div className="relative mx-auto w-[85%]">
      <nav className="my-4 flex items-center justify-center py-6 rounded-lg shadow-xl h-20 bg-primary">
        <h2 className="text-4xl">Memories </h2>
        <img src={memories} alt="memories" className="ml-4 h-16" />
      </nav>

        <section className="mt-8 flex flex-row justify-between gap-4">
          <div className="basis-4/5">
            <Posts />
          </div>
          <div className="basis-1/5">
            <Form />
          </div>
        </section>
    </div>
  );
}

export default App;
