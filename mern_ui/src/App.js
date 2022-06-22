import logo from "./logo.svg";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import LandingPage from "./components/landingPage/landingPage";
import MyNotes from "./components/myNotes/myNotes";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import CreateNotePage from "./components/CreateNotePage.react";
import UpdateNotePage from "./components/UpdateNotePage.react";
import { useState } from "react";
import UpdateProfilePage from "./components/UpdateProfilePage.react";

function App() {
  const [search, setSearch] = useState();
  console.log(search);
  return (
    <BrowserRouter>
      <div className="App">
        <Header setSearch={setSearch}></Header>
        <main>
          <Routes>
            {/* <LandingPage /> */}
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/login" element={<LoginPage />} exact />
            <Route
              path="/mynotes"
              element={<MyNotes searchNote={search} />}
              exact
            />
            <Route path="/register" element={<RegisterPage />} exact />
            <Route path="/createnote" element={<CreateNotePage />} exact />
            <Route path="/note/:id" element={<UpdateNotePage />} exact />
            <Route path="/profile" element={<UpdateProfilePage />} exact />
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
