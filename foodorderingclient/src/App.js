import './App.css';
import NavBar from './components/NavBar';
import Restaurant from './pages/Restaurant/Restaurant';
import Home from './pages/home/Home';

function App() {
  return (
      <div className=" font-poppins">
        <NavBar />
        {/* <Home /> */}
        <Restaurant />
      </div>
  );
}

export default App;
