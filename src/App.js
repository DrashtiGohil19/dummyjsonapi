
import { Routes, Route } from "react-router-dom"
import Categories from "./components/categories";
import Singleproduct from "./components/SingleProduct";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Categories/> } />
        <Route path="/products/:id" element={ <Singleproduct/> } />
      </Routes>
    </>
) 
}
export default App;
