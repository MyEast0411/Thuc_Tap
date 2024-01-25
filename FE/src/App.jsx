import {Route, Routes} from "react-router-dom";
import TrangChu from "./components/TrangChu";
import ProductPage from "./components/ProductPage";

import "./index.css";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<TrangChu/>}/>
            <Route path="/productPage" element={<ProductPage/>}/>
        </Routes>
    )
}

export default App;
