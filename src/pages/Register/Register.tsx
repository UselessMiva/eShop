import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect, useState } from "react";
import { login, register, userActions } from "../../store/user.slice";
import { Button, TextField } from "@mui/material";
import styles from "./Register.module.css";
export type RegisterForm ={
    name: {
        value:string;
    };
    email: {
        value: string;
    };
    password:{
        value: string;
    };
	avatar: {
		value: string;
	}
 }
  
export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt } = useSelector((s: RootState) => s.user);
	
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
	useEffect(() => {
	  if (jwt) {
			navigate("/");
	  }
	}, [jwt, navigate]);
  
	const validate = (target: RegisterForm) => {
	  const newErrors: { [key: string]: string } = {};
	  const { email, password, name, avatar } = target;
  
	  if (!name.value.trim()) {
			newErrors.name = "Имя обязательно";
	  }
  
	  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  if (!email.value.trim()) {
			newErrors.email = "Email обязателен";
	  } else if (!emailPattern.test(email.value)) {
			newErrors.email = "Некорректный формат email";
	  }
  
	  if (!password.value.trim()) {
			newErrors.password = "Пароль обязателен";
	  } else if (password.value.length < 6) {
			newErrors.password = "Пароль должен содержать не менее 6 символов";
	  }
  
	  if (!avatar.value.trim()) {
			newErrors.avatar = "Ссылка на аватар обязательна";
	  }
  
	  return newErrors;
	};
  
	const submit = async (e: FormEvent) => {
	  e.preventDefault();
	  dispatch(userActions.clearRegisterError());
	  
	  const target = e.target as typeof e.target & RegisterForm;
	  const validationErrors = validate(target);
	  
	  if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return; // Прекращаем выполнение, если есть ошибки
	  }
  
	  const { email, password, name, avatar } = target;
	  dispatch(register({ email: email.value, password: password.value, name: name.value, avatar: avatar.value }));
	  await sendLogin(email.value, password.value);
	};
  
	const sendLogin = async (email: string, password: string) => {
	  dispatch(login({ email, password }));
	};
  
	return (
	  <div className={styles["register"]}>
			<form onSubmit={submit} className={styles["form"]}>
		  <TextField
					id="email"
					label="Email"
					name="email"
					helperText={errors.email || "Пример youremail@mail.com"}
					error={!!errors.email}
					className={styles["input-field"]}
		  />
		  <TextField
					id="password"
					label="Password"
					type="password"
					name="password"
					helperText={errors.password || "Не менее 6 символов"}
					error={!!errors.password}
					className={styles["input-field"]}
		  />
		  <TextField
					id="name"
					name="name"
					label="Ваше имя"
					placeholder="Имя"
					variant="outlined"
					helperText={errors.name}
					error={!!errors.name}
					className={styles["input-field"]}
		  />
		  <TextField
					id="avatar"
					name="avatar"
					label="Ваш аватар"
					placeholder="Ссылка на аватар"
					defaultValue="avatar.png"
					variant="outlined"
					helperText={errors.avatar}
					error={!!errors.avatar}
					className={styles["input-field"]}
				/>
				<Button className={styles["submit-button"]} variant="contained" type="submit">Зарегистрироваться</Button>
		  </form>
		</div>
	  );
}