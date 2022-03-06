import Navbar from "./components/NavBar";
import CreateContact from "./components/CreateContact";
import ContactsList from "./components/ContactsList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
          <Route exact path="/" element={<ContactsList />} />
          <Route path="/create" element={<CreateContact />} />
      </Routes>
    </div>
  );
}

export default App;
