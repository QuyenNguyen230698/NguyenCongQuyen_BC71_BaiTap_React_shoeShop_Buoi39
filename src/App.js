import logo from './logo.svg';
import './App.css';
import Headers from './ShoeShop/components/Headers';
import HomePage from './ShoeShop/Pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import CartPage from './ShoeShop/Pages/CartPage/CartPage';
import DetailPage from './ShoeShop/Pages/DetailPage/DetailPage';

function App() {
  return (
    <div>
      <Headers/>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/detail/:id' element={<DetailPage/>} />
      </Routes>
    </div>
  );
}

export default App;
