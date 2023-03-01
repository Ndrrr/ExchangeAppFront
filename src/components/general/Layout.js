import {Outlet} from "react-router-dom";
import {Header} from "./Header";

export const Layout = (funs) => {
  return (
    <div>
      {
        <Header funs={funs}/>
      }
      <main className="App">
        <Outlet/>
      </main>
    </div>
  )
}