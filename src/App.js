import './App.css';
import Navbar from './components/Navbar';
import CheckoutPage from './components/CheckoutPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import Checkout from './components/ChekoutForm/Checkout';
import Footer from './components/Footer';
import AdminDashoard from './components/Admin/AdminDashoard';
import Home from './components/Home';
import Categories from './components/Categories';

function App() {
  const baseURLTest = "http://localhost:9000/api/";
  const baseURLProd = "http://localhost:9000/api/";
  const baseURL = baseURLTest;


  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: actionType.SET_USER,
          user: authUser,
        });

      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/checkout-page" element={<CheckoutPage baseURL={baseURL} />} />
          <Route path="/signin" element={<SignIn user={user} baseURL={baseURL} />} />
          <Route path="/signup" element={<SignUp baseURL={baseURL} />} />
          <Route path="/checkout" element={<Checkout baseURL={baseURL} />} />
          <Route path="/admindashboard" element={<AdminDashoard baseURL={baseURL} />} />

          <Route path="/" element={<div><Categories baseURL={baseURL} /><Home /></div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
