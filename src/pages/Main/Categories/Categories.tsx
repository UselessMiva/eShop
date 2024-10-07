import styles from "./Categories.module.css";
import { Button, ButtonGroup, InputLabel, MenuItem, Select } from "@mui/material";
import useGetCategories from "../../../hooks/use-GetCategories";
import { CategoriesProps } from "./Categories.props";
import { useEffect, useState } from "react";
function Categories(props: CategoriesProps) {
	const { categories } = useGetCategories();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  
	const handleResize = () => {
	  setIsMobile(window.innerWidth < 900);
	};
  
	useEffect(() => {
	  window.addEventListener("resize", handleResize);
	  return () => window.removeEventListener("resize", handleResize);
	}, []);
  
	return (
	  <>
			{isMobile ? (
				<><InputLabel id="demo-select-small-label">Категория</InputLabel>
		     <Select className={styles["select"]} label="Category" value={0} onChange={(e) => props.chooseCategory(Number(e.target.value))}>
						<MenuItem className={styles["select-item"]} value={0}>All</MenuItem>
						{categories.map(el => (
			  <MenuItem className={styles["select-item"]} key={el.id} value={el.id}>{el.name}</MenuItem>
						))}
		  </Select></>
			) : (
		  <ButtonGroup className={styles["button-group"]} variant="outlined" aria-label="Basic button group">
					<Button className={styles["category-button"]} key={0} onClick={() => props.chooseCategory(0)}>All</Button>
					{categories.map(el => (
			  <Button className={styles["category-button"]} key={el.id} onClick={() => props.chooseCategory(el.id)}>{el.name}</Button>
					))}
		  </ButtonGroup>
			)}
	  </>
	);
}
  
export default Categories;