import styles from "./Items.module.css";
import Item from "./Item/Item";
import { ItemsProps } from "./Items.props";
function Items({items}: ItemsProps) {
 
	return <div className={styles["card-container"]}>{items.map(item => (
		<Item
			key={item.id}
			id={item.id}
			title={item.title}
			description={item.description}
			category = {item.category}
			price={item.price}
			images = {item.images}/>

	))}
	</div>;
  
}

export default Items;