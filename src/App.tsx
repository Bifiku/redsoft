import './App.css'
import Header from "./layout/Header/Header.tsx";
import MyContextProvider from "./Context/MyContext.tsx";
import {Outlet} from "react-router-dom";

function App() {

  return (
      <MyContextProvider>
          <div className={'app'}>
              <Header />
              <Outlet />
          </div>
      </MyContextProvider>
  )
}

export default App
