import "./App.css";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Main />
            </div>
        </BrowserRouter>
    );
}

export default App;
