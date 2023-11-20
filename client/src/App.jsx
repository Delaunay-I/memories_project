import Posts from "./components/Posts/Post";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";

import { styles } from "./styles";

function App() {
  return (
    <div className="relative mx-auto w-[85%]">
      <nav className="my-4 flex items-center justify-center py-6 rounded-lg shadow-xl h-20">
        <h2 className="text-4xl bg-amber-600">Memories </h2>
        <img src={memories} alt="memories" className="bg-amber-600 ml-4 h-16" />
      </nav>

      <section className="">
        <div className="container mx-auto flex justify-between items-center py-4 bg-amber-200">
          <div className="">
            <Posts />
          </div>
          <div>
            <Form />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
