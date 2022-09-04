import './App.css';
import Login from './components/Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Dashboard/DashboardHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//blogs components
import CreateBlog from './components/Dashboard/Submenu/Blogs/CreateBlog';
import BlogList from './components/Dashboard/Submenu/Blogs/BlogList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        {/* blogs */}
        <Route path='/blogs/list' element={<BlogList />} />
        <Route path='/blogs/create' element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}

export default App;