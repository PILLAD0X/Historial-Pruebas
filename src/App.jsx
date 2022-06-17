import './styles/App.css';
import Home from './Pages/Home'
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import PageError404 from './Pages/PageError404'
function App() {
  //const rutaServidor = "/";
  const rutaServidor = "/Historial-pruebas";
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path={rutaServidor} exact element={<Home />}/>
        <Route path={rutaServidor+'/*'} exact element={<PageError404/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
