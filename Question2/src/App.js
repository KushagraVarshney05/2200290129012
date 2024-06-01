import "./App.css";
import React from "react";
import Header from "./Components/Header";
import AllProducts from "./Components/Products";
import SingleProduct from "./Components/SingleProduct";
import TopProductsComponent from "./Components/Filter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AllProducts />,
  },
  {
    path: "/product/:id",
    element: <SingleProduct />,
  },
  {
    path: "/top-products",
    element: <TopProductsComponent />,
  },
]);
function App() {
  return (
    <>
      <Header />
      <RouterProvider router={BrowserRouter} />
    </>
  );
}

export default App;
