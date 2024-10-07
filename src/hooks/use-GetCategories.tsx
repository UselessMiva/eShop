import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "../interfaces/category.interface";

const useGetCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getCategory = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories");
			setCategories(data);
		} catch (e) {
			console.error(e);
			setError("Failed to fetch categories");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	return { categories, error, isLoading };
};

export default useGetCategories;