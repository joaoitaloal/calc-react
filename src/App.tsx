import { BrowserRouter, Routes, Route} from 'react-router-dom' ;
import './App.css';
import style from './styles/footer.module.scss';
import gh_icon from '/github-icon.png';
import TruthTables from './pages/TruthTables';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/calc-react' element={<TruthTables/>}></Route>
      </Routes>
      <footer className={style.footer}>
        <p>Feito por <a href="https://github.com/joaoitaloal" target="_blank">Italo<img src={gh_icon} alt="logo do github" /></a></p>
      </footer>
    </BrowserRouter>
  )
}

export default App
