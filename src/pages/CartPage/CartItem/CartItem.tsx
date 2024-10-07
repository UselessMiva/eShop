
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { cartActions } from "../../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
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
		<div >
			<img src={`${props.images[0]}`}/>
			<div>
				<div >{props.title}</div>
				<div >{props.price}&nbsp;$</div>
			</div>
			<div >
				<button  onClick={descrease}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>
				<div >{props.count}</div>
				<button  onClick={increase}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>
				<button  onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
	);
}
export default CartItem;