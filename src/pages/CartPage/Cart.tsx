
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Item } from "../../interfaces/Item.interface";
import axios from "axios";
import CartItem from "./CartItem/CartItem";
import { cartActions } from "../../store/cart.slice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Item[]>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const items = useSelector((s: RootState) => s.cart.items);
	const total = items.map(i => {
		const product = cartProducts.find(item => item.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);
	const getItem = async (id: number) => {
		const { data } = await axios.get<Item>(`https://api.escuelajs.co/api/v1/products/${id}`);
		return data;
	};
	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};
	const checkout = () => {
		
		dispatch(cartActions.clean());
	};
	useEffect(() => {
		if (!jwt) {
			navigate("/auth/login");
		}
	}, [jwt, navigate]);
	useEffect(() => {
		loadAllItems();
	}, []);
	
	return (
		<div>
			<div>
				{items.map(i => {
					const product = cartProducts.find(p => p.id === i.id);
					if (!product) {
						return;
					}
					return <CartItem key={product.id} count={i.count} {...product} />;
				})}
				<div >
					<div >Итог</div>
					<div >{total}&nbsp;<span>$</span></div>
				</div>
				<hr  />
				<div >
					<div >Доставка</div>
					<div >{1.89}&nbsp;<span>$</span></div>
				</div>
				<hr />
				<div >
					<div >Итог <span>({items.length})</span></div>
					<div >{total + 1.89}&nbsp;<span>$</span></div>
				</div>
				<hr />
				<div >
					<button  onClick={checkout}>оформить</button>
				</div>
			</div>
      
		</div>
	);
}