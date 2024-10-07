import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/authLayout/AuthLayout.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import About from "./pages/About/About.tsx";
import Contacts from "./pages/Contacts/Contacs.tsx";
import { Login } from "./pages/Login/Login.tsx";
import MenuLayout from "./layout/MenuLayout/MenuLayout.tsx";
import { Register } from "./pages/Register/Register.tsx";
import ItemCard from "./pages/ItemPage/ItemPage.tsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Cart from "./pages/CartPage/Cart.tsx";
import { Profile } from "./pages/ProfilePage/Profile.tsx";
import MainPage from "./pages/Main/MainPage.tsx";
const router = createBrowserRouter([
	{
		path:"/",
		element: <MenuLayout/>,
		children: 
    [{path: "/",
    	element: <MainPage></MainPage> },
    {path: "/cart",
    	element: <Cart></Cart>},
    {path: "/products/:id",
    	element: <ItemCard></ItemCard>,
    	loader: async ({params}) => {
    		const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products/${params.id}`);
    		return data;
    	}
    },
    {path: "/about",
    	element: <About></About>},
    {path: "/contacts",
    	element: <Contacts></Contacts>},
    {path: "/profile",
    	element: <Profile></Profile>
    }
    ]
	},
	{
		path: "/auth",
		element: <AuthLayout/>,
		children: [
			{
				path: "login",
				element: <Login></Login>
			}, {
				path: "register",
				element: <Register></Register>
			}
		]
	},
	{
		path: "*",
		element: <ErrorPage></ErrorPage>
	}
]);
createRoot(document.getElementById("root")!).render(
	<StrictMode>  
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
