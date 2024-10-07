import { Link } from "react-router-dom";
import styles from "./MenuFooterLayout.module.css";
import { Button } from "@mui/material";
export default function MenuFooterLayout(){
	return<div className={styles["menu-footer"]}>
		<Button component={Link} variant="contained" className={styles["button-link"]} to='/contacts'>Контакты</Button>
		<Button  component={Link} variant="contained"  className={styles["button-link"]} to='/about'>О нас</Button>
	</div>;
}
