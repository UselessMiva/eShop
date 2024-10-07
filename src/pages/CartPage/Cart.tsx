import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Item } from "../../interfaces/Item.interface";
import axios from "axios";
import CartItem from "./CartItem/CartItem";
import { cartActions } from "../../store/cart.slice";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Item[]>([]);
	const [open, setOpen] = useState(false);
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
	const checkout = async() => {
		handleClick();
		dispatch(cartActions.clean());
	};

	const handleClick = () => {
	  setOpen(true);
	};
  
	const handleClose = (
	  _event: React.SyntheticEvent | Event,
	  reason?: SnackbarCloseReason
	) => {
	  if (reason === "clickaway") {
			return;
	  }
  
	  setOpen(false);
	};
  
	const action = (
	  <>
			<IconButton
		  		size="small"
		  		aria-label="close"
		  		color="inherit"
		  		onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
	  </>
	);
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
					<Button onClick={checkout} variant="contained">оформить</Button>
				</div>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Заказ оформлен"
				action={action}
				sx={{
					"& .MuiSnackbarContent-root": {
						backgroundColor: "white",
						color: "blue"
					}
				}}
			/>
		</div>
	);
}