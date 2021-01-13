import './App.css';
import Header from "./Components/Header";
import {BrowserRouter, Route} from "react-router-dom";
import ItemsContainer from "./Components/Items/ItemsContainer";
import NavMenuContainer from "./Components/NavMenu/NavMenuContainer";
import FilmsContainer from "./Components/Films/FilmsContainer";

function App(props) {
    console.log(props)
    return (
      <BrowserRouter>
          <div className="App">
              <NavMenuContainer/>
              {/*<Route path="/items" render={() => <ItemsContainer/>} />*/}
              <Route path="/films" render={() => <FilmsContainer/>} />
          </div>
      </BrowserRouter>
    );
}

export default App;
