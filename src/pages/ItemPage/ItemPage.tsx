
import { useLoaderData } from "react-router-dom";
import { Item } from "../../interfaces/Item.interface";
import ImageSlider from "./ImageSlider/ImageSlider";
import { Button, Typography } from "@mui/material";
//import { useDispatch } from "react-redux";
//import { AppDispatch } from "../../store/store";
//import { cartActions } from "../../store/cart.slice";
export default function ItemCard() {
	const data = useLoaderData() as Item;
	return <>
		<ImageSlider images={data.images}></ImageSlider>
		<Typography variant="h1" gutterBottom>
			{data.title}
		</Typography>
		<Typography variant="body1" gutterBottom>
			{data.description}
		</Typography>
		<Typography variant="subtitle1" gutterBottom>
			{data.price}$
		</Typography>
		<Button variant="contained" >Добавить в корзину</Button>
	</>;
}