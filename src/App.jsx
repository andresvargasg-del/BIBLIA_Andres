import { BrowserRouter, Routes, Route } from "react-router-dom";
import Biblia from "./Biblia";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Biblia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;