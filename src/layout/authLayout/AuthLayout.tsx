import { Outlet } from "react-router-dom";
import AuthHeaderLayout from "./AuthHeaderLayout/AuthHeaderLayout";
import AuthFooterLayout from "./AuthFooterLayout/AuthFooterLayout";
export default function AuthLayout(){
	return <div>
		<AuthHeaderLayout/>
		<Outlet></Outlet>
		<AuthFooterLayout/>
	</div>;
}