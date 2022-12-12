import { Helmet } from "react-helmet";
import Main from "./views/main";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Helmet>
        <title>Veryfi Receipt OCR API Sample</title>
      </Helmet>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
