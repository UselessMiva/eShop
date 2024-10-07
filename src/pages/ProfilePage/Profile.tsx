import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect } from "react";
import { updateUserData } from "../../store/user.slice";
import { TextField } from "@mui/material";
export type UpdateUserDataForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
    name:{
        value:string;
    }
    avatar:{
        value: string;
    }
}
export function Profile() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const profile = useSelector((s: RootState) => s.user.profile);
	
	useEffect(() => {
		if (!jwt) {
			navigate("/auth/login");
		}
	}, [jwt, navigate]);


	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & UpdateUserDataForm;
		const { email, password, name, avatar } = target;
		dispatch(updateUserData( {email: email?.value, id: `${profile!.id}`,  password: password?.value, name: name?.value, avatar: avatar?.value} ));
	};
	const renderProfile =()=>{
		if (profile){
			return <>
				<img src={profile?.avatar}></img>
				<div>{profile?.name}</div>
				<div>{profile?.email}</div>
				<div>
					<h2>Обновить данные</h2>
					<form onSubmit={submit}>
						<div >
							<TextField
								id="email" 
								label="Email" 
								defaultValue={profile.email} 
							/>
						</div>
						<div >
							<label htmlFor="password">Ваш пароль</label>
							<input id="password" name='password' type="password" placeholder='Пароль' defaultValue={profile.password}/>
						</div>
						<div >
							<label htmlFor="name">Ваше имя</label>
							<input id="name" name='name' placeholder='Имя' defaultValue={profile.name}/>
						</div>
						<div >
							<label htmlFor="avatar">Ваш аватар</label>
							<input id="avatar" name='avatar' placeholder='Ссылка на аватар' defaultValue={profile.avatar}/>
						</div>
						<button>Обновить</button>
					</form>
				</div>
			</>;
		}
	};

	return<>
		{renderProfile()}
	</>;

}