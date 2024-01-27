import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AppContext } from './context/ContextApi';
import SearchQuery from './components/SearchQuery';
import Home from './components/Home';
import VideoComponents from './components/VideoComponents';

function App() {
  return (
    <>
      <AppContext>
        <BrowserRouter>
          <div className='flex flex-col h-full'>
            <Header />
            <Routes>
              <Route path='/' element={
              <>
                <Home />
              </>
            } />
              <Route path='/search/:searchQuery' element={
                <>
                  <SearchQuery />
                </>
              } />
              <Route path='/video/:id' element={
                <>
                  <VideoComponents />
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </AppContext>
    </>
  );
}

export default App;
