import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';


/** react routes */
function RouteError() {
  return (
    <div className="container">
      <h1 className="text-light">404 - Page Not Found</h1>
      <p className="text-light">The page you are looking for does not exist.</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <RouteError />   // ✅ used when error happens
  },
  {
    path: '/quiz',
    element: <CheckUserExist><Quiz /></CheckUserExist>,
    errorElement: <RouteError />
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>,
    errorElement: <RouteError />
  },
  {
    path: '*',   // ✅ fallback for unmatched routes
    element: <RouteError />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
