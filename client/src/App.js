import "../node_modules/font-awesome/css/font-awesome.min.css";
import List from "./components/movies/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ShowHideProvider } from "./context/ShowHideProvider";

function App() {
  return (
    <div className="App">
      <ShowHideProvider>
        <Header />
        <List />
        <Footer />
      </ShowHideProvider>
    </div>
  );
}

export default App;
