import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
      </div>
    </Router>
  );
}

export default App;
 