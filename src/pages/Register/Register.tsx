import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect } from "react";
import { login, register, userActions } from "../../store/user.slice";

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

export function Register(){ 
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);
	useEffect(() => {
		if (jwt) {
			navigate("/");
		}
	}, [jwt, navigate]);
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name, avatar } = target;
		dispatch(register({ email: email.value, password: password.value, name: name.value, avatar: avatar.value }));
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};

	return<>
		
		{registerErrorMessage && <div>{registerErrorMessage}</div>}
		<form onSubmit={submit}>
			<div >
				<label htmlFor="email">Ваш email</label>
				<input id="email" name='email' placeholder='Email' />
			</div>
			<div >
				<label htmlFor="password"></label>
				<input id="password" name='password' type="password" placeholder='Пароль' />
			</div>
			<div >
				<label htmlFor="name">Ваше имя</label>
				<input id="name" name='name' placeholder='Имя' />
			</div>
			<div >
				<label htmlFor="avatar">Ваш аватар</label>
				<input id="avatar" name='avatar' placeholder='Ссылка на аватар' defaultValue={"avatar.png"}/>
			</div>
			<button>Зарегестрироваться</button>
		</form>
	</>;
}