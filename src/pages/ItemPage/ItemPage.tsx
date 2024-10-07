
import { useLoaderData } from "react-router-dom";
import { Item } from "../../interfaces/Item.interface";
import ImageSlider from "./ImageSlider/ImageSlider";
import { Button, Typography } from "@mui/material";
import styles from "./ItemPage.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
export default function ItemCard() {
	const data = useLoaderData() as Item;
	const dispatch  = useDispatch<AppDispatch>();
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(data.id));
	};
	return <>
		<div className={styles["container"]}>
			<div className={styles["imageSlider"]}>
				<ImageSlider images={data.images} />
			</div>
			<div className={styles["textContainer"]}>
				<Typography variant="h1" gutterBottom className={styles["title"]} >
					{data.title}
				</Typography>
				<Typography variant="body1" gutterBottom className={styles["description"]}>
					{data.description}
				</Typography>
				<div className={styles["buttonContainer"]}>
					<Typography variant="subtitle1" gutterBottom className={styles["price"]}>
						{data.price}$
					</Typography>
					<Button variant="contained" onClick={add}>Добавить в корзину</Button>
				</div>
			</div>
		</div>
	</>;
}