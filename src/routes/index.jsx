import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from '../pages/home'
import ErrorPage from '../error-page'
import AuthRoute from '../outlets/AuthRoute'
import Register from '../pages/register'
import Login from '../pages/login'
import ItemDetail from '../pages/item-detail'
import Item from '../pages/item'
import ItemAdd from '../pages/item-add'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/job/:id',
        element: <ItemDetail />,
    },
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            {
                path: '/job',
                element: <Item />,
            },
            {
                path: '/job/add',
                element: <ItemAdd />,
            },
            {
                path: '/job/edit/:id',
                element: <ItemAdd />,
            },
        ]
    }

])

const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes