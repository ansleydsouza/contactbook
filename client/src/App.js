import Navbar from "./components/NavBar";
import CreateContact from "./components/CreateContact";
import ContactsList from "./components/ContactsList";
import UpdateContact from "./components/UpdateContact";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
          <Route exact path="/" element={<ContactsList />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/update/:id" element={<UpdateContact />} />
      </Routes>
    </div>
  );
}

export default App;
