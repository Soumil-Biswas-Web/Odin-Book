import Header from "./Content/Header/Header"
import Footer from "./Content/Footer/Footer"
import { Outlet } from "react-router-dom"
import { Flash } from "./Content/Components/Flash"

function App() {

  return (
    <div className="bg-background-color flex flex-col items-center min-h-screen justify-between transition-theme">
      <Flash />
      <Outlet />
    </div>
  )
}

export default App
