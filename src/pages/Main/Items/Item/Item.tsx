import * as React from "react";
import { ItemProps } from "./Item.props";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { cartActions } from "../../../../store/cart.slice";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
export default function Item(props: ItemProps) { 
	const dispatch  = useDispatch<AppDispatch>();
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};
	const card = (
		<>
			<CardContent className={styles["card"]}>
				{props.images[1] ? (<img className={styles["card-image"]} src={props.images[0]}></img>) :(<ImageNotSupportedIcon height='400px'/> )
				}
				<Typography variant="h5" className={styles["card-title"]} component="div">
					{props.title}
				</Typography>
				<Typography className={styles["card-description"]}>{props.description}</Typography>
				<Typography className={styles["card-price"]}>
					$ {props.price}
				</Typography>
				<ButtonGroup className={styles["card-buttons"]} size="large" variant="outlined">
					<Button className={styles["btn"]} component={Link} to={`/products/${props.id}`} variant="contained" >
						Подбробнее
					</Button>
					<Button className={styles["btn"]} variant="contained" onClick={add}>Добавить в корзину</Button>
				</ButtonGroup>
			</CardContent>
			
		</>
	);
	return <> 
		{card}
	</>;
    
}



