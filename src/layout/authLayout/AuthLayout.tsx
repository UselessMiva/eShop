import { Outlet } from "react-router-dom";
import AuthHeaderLayout from "./AuthHeaderLayout/AuthHeaderLayout";
import AuthFooterLayout from "./AuthFooterLayout/AuthFooterLayout";
import styles from "./AuthLayout.module.css";
export default function AuthLayout(){
	return <div className={styles["container"]}>
		<AuthHeaderLayout/>
		<Outlet></Outlet>
		<AuthFooterLayout/>
	</div>;
}