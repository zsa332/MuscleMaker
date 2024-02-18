"use client";

import LoginModal from "./LoginModal";

import { HashRouter, Route, Routes } from "react-router-dom"; // *BrowserRouter를 import
import SignupModal from "./SignupModal";
import InitialSetupModal from "./InitialSetup";
import InitialTargetSetup from "./InitialTargetSetup";

export default function Main() {
  return (
    <>
      {/* <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginModal />}></Route>
            <Route path="/signup" element={<SignupModal />}></Route>
            <Route path="/initialSetup" element={<InitialSetupModal />}></Route>
            <Route
              path="/initialTargetSetup"
              element={<InitialTargetSetup />}
            ></Route>
          </Routes>
        </div>
      </HashRouter> */}
    </>
  );
}
