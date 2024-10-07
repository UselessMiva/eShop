
import Categories from "./Categories/Categories";
import useGetProducts from "../../hooks/use-GetItems";
import Items from "./Items/Items";
import { useCallback, useEffect, useState } from "react";
import { Item } from "../../interfaces/Item.interface";
function MainPage() {
	const { items, error, isLoading } = useGetProducts(); 
	const [itemsByFilter, SetProductsbyFilter] =useState<Item[]>(items);
	const chooseCategory =useCallback((categoryId: number) => {
		if (categoryId === 0 ) {
			return SetProductsbyFilter(items);
		} else {
			return  SetProductsbyFilter(items.filter(el => el.category.id === categoryId));
      
		}}, [items]);
        
	useEffect(() => {
		chooseCategory(0);
	}, [chooseCategory]);
	return (
		<>
			<Categories chooseCategory={chooseCategory}></Categories>
			<div>
				{error && <>{error}</>}
				{isLoading && <>Загружаем продукты...</>}
				{!isLoading && items.length > 0 && <Items items={itemsByFilter}></Items>}
			</div>
      
		</>
	);
}

export default MainPage;
