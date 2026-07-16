import './App.css';
import Home from './component/Home';
 import MovieDetails from './component/MovieDetails';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AllMovies from './component/AllMovies/AllMovies';
import Features from './component/Features/Features';
import Navbar from './Navbar';
import Search from './component/Search';
import Upcoming from './component/Upcoming/Upcoming';
import Footer from './Footer';
function App() {  
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Navbar />
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/all-movies" element={<AllMovies />} />
        <Route path="/features" element={<Features />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upcoming" element={<Upcoming />} />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
