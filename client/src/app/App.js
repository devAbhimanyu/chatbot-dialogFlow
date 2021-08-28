import { BrowserRouter, Route } from 'react-router-dom';
import { About, Landing, Shop, Header, Chatbot } from '../components';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/shop' component={Shop} />
          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;