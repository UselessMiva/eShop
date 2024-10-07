import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {  login, userActions } from "../../store/user.slice";
import { Button, TextField } from "@mui/material";

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}
export function Login() {
	
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);
	useEffect(() => {
		if (jwt) {
			navigate("/");
		}
	}, [jwt, navigate]);
	
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
		
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};

	return <div className={styles["login"]}>
		{loginErrorMessage && <div className={styles["error"]}>{loginErrorMessage}</div>}
		<form className={styles["form"]} onSubmit={submit}>
			<TextField className={styles["input-field"]} id="email" label="Email" name="email"  inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }}  />
			<TextField className={styles["input-field"]}
				id="password"
				label="Password"
				type="password"
				name="password"
				inputProps={{ minLength: 6 }}
			/>
			<Button className={styles["submit-button"]}variant="contained" type="submit">Вход</Button>
		</form>
		<div className={styles["links"]}>
			<div>Нет акканута?</div>
			<Link to="/auth/register">Зарегистрироваться</Link>
		</div>
	</div>;
}