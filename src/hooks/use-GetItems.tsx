import { useEffect, useState } from "react";
import { Item } from "../interfaces/Item.interface";
import axios, { AxiosError } from "axios";

const useGetItems = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [error, setError] = useState<string|null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getProducts = async() => {
		try{
			const {data} = await axios.get<Item[]>("https://api.escuelajs.co/api/v1/products");
			setItems(data);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return { items, error, isLoading };
};

export default useGetItems;