import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./Home.tsx";
import PetDetails from "./PetDetails.tsx";
import PetsOverview from "./PetsOverview.tsx";
import {useInitializeDataForApplication} from "./useInitializeDataForApplication.tsx";

function App() {

    useInitializeDataForApplication();

    return (
        <>

            <RouterProvider router={createBrowserRouter([

                {
                    path: '/',
                    element: <Home/>,
                    children: [
                        {
                            path: '/pets',
                            element: <PetsOverview/>
                        },
                        {
                            path: '/pet/:petId',
                            element: <PetDetails/>
                        }
                    ]
                },
            ])}/>

        </>
    )
}

export default App