import { Link } from "react-router-dom";
import styles from "./MenuFooterLayout.module.css";
export default function MenuFooterLayout(){
	return<div className={styles["menu-footer"]}>
		<Link className={styles["footer-link"]} to='/contacts'>Контакты</Link>
		<Link className={styles["footer-link"]} to='/about'>О нас</Link>
	</div>;
}
