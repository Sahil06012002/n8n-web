import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import Overview from "./pages/Overview";
import WorkflowPlayground from "./pages/WorkflowPlayground";

function App() {
  return (
    <>
      <div>
        <AuthenticatedLayout>
          <WorkflowPlayground />
        </AuthenticatedLayout>
      </div>
    </>
  );
}

export default App;
