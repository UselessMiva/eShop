import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (<>
		<h1>Такой страницы не существует</h1>
		<Link to='/'>Вернуться на главную старницу</Link>
	</>
	);
}