import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./login";
import SearchPage from "./data";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
