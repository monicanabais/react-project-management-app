import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <>
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <div className="App">
            {user && <Sidebar />}
            <div className="container">
              <Switch>
                <Route exact path="/">
                  {user && <Dashboard />}
                  {!user && <Redirect to="/login" />}
                </Route>
                <Route path="/create">
                  {user && <Create />}
                  {!user && <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                  {!user && <Login />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/signup">
                  {!user && <Signup />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/projects/:id">
                  {user && <Project />}
                  {!user && <Redirect to="/login" />}
                </Route>
              </Switch>
            </div>
            {user && <UserList />}
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App
