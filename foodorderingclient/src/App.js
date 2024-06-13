import './App.css';
import NavBar from './components/NavBar';
import Restaurant from './pages/Restaurant/Restaurant';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile';

function App() {
  return (
      <div className=" font-poppins">
        <NavBar />
        {/* <Home /> */}
        {/* <Restaurant /> */}
        {/* <Cart /> */}
        <Profile />
      </div>
  );
}

export default App;
