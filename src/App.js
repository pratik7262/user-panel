import { Route, Routes } from "react-router-dom";
import AddProperty from "./components/AddProperty";
import Approval from "./components/Approval";
import ApprovedProperties from "./components/ApprovedProperties";
import Home from "./components/Home";
import ListedProperties from "./components/ListedProperties";
import Login from "./components/Login";
import Marketplace from "./components/Marketplace";
import NewProperties from "./components/NewProperties";
import Portfolio from "./components/Portfolio";
import Signup from "./components/Signup";

import { Topbar } from "./components/Topbar";

function App() {
  return (
    <div className="app">
      <main
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <Topbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<NewProperties />} />
          <Route path="/properties/holdings" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties/sell" element={<AddProperty />} />
          <Route path="/properties/pendingapproval" element={<Approval />} />
          <Route path="/properties/approvedproperties" element={<ApprovedProperties />} />
          <Route path="/properties/listedproperties" element={<ListedProperties/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
