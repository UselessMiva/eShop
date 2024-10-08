
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { cartActions } from "../../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CartItem.module.css";
import { Box } from "@mui/material";
function CartItem(props: CartItemProps) {
	console.log(props);
	const dispatch = useDispatch<AppDispatch>();
	const increase = () => {
		dispatch(cartActions.add(props.id));
	};

	const descrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};


	return (
		<Box className={styles["cart-item"]}>
			<Box className={styles["cart-item-details"]}>
				<img src={`${props.images[0]}`}/>
				<Box>
					<Box >{props.title}</Box>
					<Box >{props.price}&nbsp;$</Box>
				</Box>
				<Box className={styles["cart-item-controls"]}>
					<RemoveIcon onClick={descrease} />
					<Box >{props.count}</Box>
					<AddIcon onClick={increase}/>
					<DeleteIcon onClick={remove}/>
				</Box>
			</Box>
		</Box>
	);
}
export default CartItem;