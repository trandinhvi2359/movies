import "../node_modules/font-awesome/css/font-awesome.min.css";
import { ToastProvider, useToasts } from "react-toast-notifications";

import List from "./components/movies/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ShowHideProvider } from "./context/ShowHideProvider";

function App() {
  return (
    <div className="App">
      <ShowHideProvider>
        <ToastProvider>
          <Header />
          <List />
          <Footer />
        </ToastProvider>
      </ShowHideProvider>
    </div>
  );
}

export default App;
