import './App.css';
import NavBar from './components/NavBar';
import Restaurant from './pages/Restaurant/Restaurant';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart'

function App() {
  return (
      <div className=" font-poppins">
        <NavBar />
        {/* <Home /> */}
        {/* <Restaurant /> */}
        <Cart />
      </div>
  );
}

export default App;
