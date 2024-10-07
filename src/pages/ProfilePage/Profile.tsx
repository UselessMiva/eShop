import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect, useState } from "react";
import { updateUserData } from "../../store/user.slice";
import { Button, TextField } from "@mui/material";
import styles from "./Profile.module.css";
export type UpdateUserDataForm = {
	email: {
	  value: string;
	};
	password: {
	  value: string;
	};
	name: {
	  value: string;
	};
	avatar: {
	  value: string;
	};
  };
  
export function Profile() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const profile = useSelector((s: RootState) => s.user.profile);
	
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
	useEffect(() => {
	  if (!jwt) {
			navigate("/auth/login");
	  }
	}, [jwt, navigate]);
  
	const validate = (email: string, password: string, name: string, avatar: string) => {
	  const newErrors: { [key: string]: string } = {};
	  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
	  if (!email || !emailRegex.test(email)) {
			newErrors.email = "Введите корректный email.";
	  }
	  if (!password || password.length < 6) {
			newErrors.password = "Пароль должен содержать не менее 6 символов.";
	  }
	  if (!name) {
			newErrors.name = "Имя не может быть пустым";
	  }
	  if (!avatar) {
			newErrors.avatar = "Ссылка на аватар обязательна.";
	  }
  
	  return newErrors;
	};
  
	const submit = async (e: FormEvent) => {
	  e.preventDefault();
	  const target = e.target as typeof e.target & UpdateUserDataForm;
	  const { email, password, name, avatar } = target;
  
	  const validationErrors = validate(email.value, password.value, name.value, avatar.value);
	  
	  if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
	  }
  
	  setErrors({});
	  
	  dispatch(updateUserData({
			email: email.value,
			id: profile!.id.toString(),
			password: password.value,
			name: name.value,
			avatar: avatar.value
	  }));
	};
  
	const renderProfile = () => {
		if (profile) {
		  return (
				<div className={styles["profileContainer"]}>
			  <div className={styles["profileSection"]}>
						<img src={profile?.avatar} alt="Avatar" className={styles["avatar"]} />
						<div className={styles["profileInfo"]}>
				  			<div>{profile?.name}</div>
				  			<div>{profile?.email}</div>
						</div>
			  </div>
			  <div >
						<h2>Обновить данные</h2>
						<form onSubmit={submit} className={styles["formSection"]}>
				  			<TextField
								id="email"
								label="Email"
								name="email"
								error={!!errors.email}
								className={styles["inputField"]}
				  			/>
				  			<TextField
								id="password"
								label="Password"
								type="password"
								name="password"
								error={!!errors.password}
								className={styles["inputField"]}
				 			/>
				 			<TextField
								id="name"
								name="name"
								label="Ваше имя"
								placeholder="Имя"
								variant="outlined"
								helperText={errors.name}
								error={!!errors.name}
								className={styles["inputField"]}
				  			/>
				  			<TextField
								id="avatar"
								name="avatar"
								label="Ваш аватар"
								placeholder="Ссылка на аватар"
								variant="outlined"
								helperText={errors.avatar}
								error={!!errors.avatar}
								className={styles["inputField"]}
				  			/>
				  <Button type="submit" className={styles.submitButton} variant="contained">Обновить</Button>
						</form>
			  </div>
				</div>
		  );
		}
	  };
	

	return<>
		{renderProfile()}
	</>;

}