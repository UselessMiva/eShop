import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
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
	const {jwt} = useSelector((s: RootState) => s.user);
	
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
	useEffect(() => {
	  if (jwt) {
			navigate("/");
	  }
	}, [jwt, navigate]);
  
	const validate = (target: LoginForm) => {
	  const newErrors: { [key: string]: string } = {};
	  const { email, password } = target;
  
	  if (!email.value.trim()) {
			newErrors.email = "Email обязателен";
	  } else {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(email.value)) {
		  newErrors.email = "Некорректный формат email";
			}
	  }
  
	  if (!password.value.trim()) {
			newErrors.password = "Пароль обязателен";
	  } else if (password.value.length < 6) {
			newErrors.password = "Пароль должен содержать не менее 6 символов";
	  }
  
	  return newErrors;
	};
  
	const submit = async (e: FormEvent) => {
	  e.preventDefault();
	  dispatch(userActions.clearLoginError());
  
	  const target = e.target as typeof e.target & LoginForm;
	  const validationErrors = validate(target);
	  
	  if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return; // Прекращаем выполнение, если есть ошибки
	  }
  
	  const { email, password } = target;
	  await sendLogin(email.value, password.value);
	};
  
	const sendLogin = async (email: string, password: string) => {
	  dispatch(login({ email, password }));
	};
  
	return (
	  <div className={styles["login"]}>
		
			<form className={styles["form"]} onSubmit={submit}>
		  <TextField
					className={styles["input-field"]}
					id="email"
					label="Email"
					name="email"
					helperText={errors.email || "Пример youremail@mail.com"}
					error={!!errors.email}
		  />
		  <TextField
					className={styles["input-field"]}
					id="password"
					label="Password"
					type="password"
					name="password"
					helperText={errors.password || "Не менее 6 символов"}
					error={!!errors.password}
		  />
		  <Button className={styles["submit-button"]} variant="contained" type="submit">Вход</Button>
			</form>
		
			<div className={styles["links"]}>
		  <div>Нет акканута?</div>
		  <Link to="/auth/register">Зарегистрироваться</Link>
			</div>
	  </div>
	);
}