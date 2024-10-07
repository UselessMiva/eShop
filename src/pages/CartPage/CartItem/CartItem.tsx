
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { cartActions } from "../../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CartItem.module.css";
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
		<div className={styles["cart-item"]}>
			<div className={styles["cart-item-details"]}>
				<img src={`${props.images[0]}`}/>
				<div>
					<div >{props.title}</div>
					<div >{props.price}&nbsp;$</div>
				</div>
				<div className={styles["cart-item-controls"]}>
					<RemoveIcon onClick={descrease} />
					<div >{props.count}</div>
					<AddIcon onClick={increase}/>
					<DeleteIcon onClick={remove}/>
				</div>
			</div>
		</div>
	);
}
export default CartItem;