import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import ItemsContainer from "./Components/Items/ItemsContainer";
import NavMenuContainer from "./Components/NavMenu/NavMenuContainer";
import FilmsContainer from "./Components/Films/FilmsContainer";
import FilmsSearchContainer from "./Components/Films/FilmsSearchContainer";
import UserContainer from "./Components/User/UserContainer";

function App(props) {
    return (
      <BrowserRouter>
          <div className="App">
              <NavMenuContainer/>
              {/*<Route path="/items" render={() => <ItemsContainer/>} />*/}
              <Route path="/login" render={() => <UserContainer/>} />
              <Route path="/films" render={() => <FilmsContainer/>} />
              <Route path="/films-search" render={() => <FilmsSearchContainer/>} />
          </div>
      </BrowserRouter>
    );
}

export default App;
