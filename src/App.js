import './App.css';
import Navbar from './components/Navbar';
import Weaather from './components/Weaather';
import Context from './components/Context';
import PopularCity from './components/PopularCity';
function App() {
  return (
    <Context>
      <Navbar />
      <Weaather/>
      <PopularCity/>
    </Context>
  )
}

export default App;
