import './App.css';

import { RouterProvider } from 'react-router-dom';
import router from './router/routes';

function App() {
  return (
      <div className=" font-poppins">
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
