import { Outlet } from "react-router-dom";
import MenuFooterLayout from "./MenuFooterLayout/MenuFooterLayout";
import MenuHeaderLayout from "./MenuHeaderLayout/MenuHeaderLayout";
export default function MenuLayout(){
	return <div>
		<MenuHeaderLayout></MenuHeaderLayout>
		<Outlet></Outlet>
		<MenuFooterLayout></MenuFooterLayout>
	</div>;
}