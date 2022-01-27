import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/checkout-page" element={<CheckoutPage/>}/>
            <Route path="/" element={<Products/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
