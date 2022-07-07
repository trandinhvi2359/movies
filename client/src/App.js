import "../node_modules/font-awesome/css/font-awesome.min.css";
import List from "./components/movies/List";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <List />
      <Footer />
    </div>
  );
}

export default App;
