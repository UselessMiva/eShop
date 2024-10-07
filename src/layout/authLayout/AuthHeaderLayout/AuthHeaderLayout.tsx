import { Link } from "react-router-dom";
import styles from "./AuthHeaderLayout.module.css";
export default function AuthHeaderLayout(){
	return <div className={styles["link-container"]}>
		<Link className={styles["main-link"]} to='/'>eShop</Link>
	</div>;
}
