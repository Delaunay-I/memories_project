import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Posts from "./Posts/Posts";
import Form from "./Form/Form";

import { getPosts } from "../features/post/postSlice";
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    // <section className="mt-8 px-8 flex sm:flex-row flex-col-reverse sm:items-start items-center  gap-4">
    <div className="w-4/5">
      <section className="mt-8 px-8 flex sm:flex-row flex-col-reverse justify-between">
        <Posts setCurrentId={setCurrentId} />
        <div className="">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </section>
    </div>
  );
};

export default Home;
