import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import {useEffect} from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import Checkout from './components/ChekoutForm/Checkout';
import reportWebVitals from './reportWebVitals';

function App() {
  
  const [{user}, dispatch] = useStateValue();


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if(authUser){
        dispatch ({
          type: actionType.SET_USER,
          user: authUser,
        });
      
      }
    })
  },[])

  reportWebVitals(console.log)

  return (
    <Router>
      <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/checkout-page" element={<CheckoutPage/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/" element={<Products/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
