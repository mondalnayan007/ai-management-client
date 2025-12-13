import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddModels from "../Pages/AddModels";
import AllModels from "../Pages/AllModels";
import ModelDetails from "../Pages/ModelDetails";
import UpdateModel from "../Pages/UpdateModel";
import MyModels from "../Pages/MyModels";
import MyPurchase from "../Pages/MyPurchase";
import ErrorPage from "../Pages/ErrorPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('https://ai-management-server.vercel.app/latest-models')
            },
            {
                path: 'all-models',
                element: <AllModels />,
                loader: () => fetch('https://ai-management-server.vercel.app/models')
            },
            {
                path: 'add-model',
                element: (
                    <PrivateRoute>
                        <AddModels />
                    </PrivateRoute>
                )
            },
            {
                path:'model-details/:id',
                element:(
                    <PrivateRoute>
                        <ModelDetails></ModelDetails>
                    </PrivateRoute>
                )
                
            },
            {
                path:'/update-model/:id',
                element:(
                    <PrivateRoute>
                        <UpdateModel></UpdateModel>
                    </PrivateRoute>
                ),
                loader:({params})=>fetch(`https://ai-management-server.vercel.app/models/${params.id}`)
            },
            {
                path:'/my-models',
                element:<PrivateRoute>
                    <MyModels></MyModels>
                </PrivateRoute>
            },
            {
                path:'/my-purchase',
                element:<PrivateRoute>
                    <MyPurchase></MyPurchase>
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    }
    ,{
        path:'*',
         element:<ErrorPage></ErrorPage>
    }
]);
