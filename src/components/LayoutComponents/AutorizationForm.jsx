import React from "react";
import axios from "axios";

class AutorizationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			userLastName: "",
			mail: "",
			address: "",
			userPassword: 0,
		};
	}

	render() {
		return (
			<div 
				className="popup-bg fixed w-full h-screen top-0 left-0 bg-gray-500/50 opacity-0 pointer-events-none"
				onClick={(e) => {
					if (e.target.classList.contains("popup-bg")) {
						this.closePopup();
					}
				}}
				>
				
				<form className="popup absolute top-1/2 left-1/2 w-6/12 p-6 bg-white translate-x-[-50%] translate-y-[-50%] rounded-xl opacity-0 pointer-events-none" ref={(el) => this.myForm = el}>
					<label className="w-full mb-6 flex flex-col-reverse">

						<input className="pointer-events-all h-9 text-lg outline-none border-b-orange-400 border-b color-black" type="text" name="name" onChange={event => this.setState({ userName: event.target.value})}></input>
						<div className="text-sm uppercase font-medium mb-1.5">Ваше имя:</div>

					</label>

					<label className="w-full mb-6 flex flex-col-reverse">

						<input className="pointer-events-all h-9 text-lg outline-none border-b-orange-400 border-b color-black" type="text" name="lastName" onChange={event => this.setState({ userLastName: event.target.value})}></input>
						<div className="text-sm uppercase font-medium mb-1.5">Ваша фамилия:</div>

					</label>

					<label className="w-full mb-6 flex flex-col-reverse">

						<input className="pointer-events-all h-9 text-lg outline-none border-b-orange-400 border-b color-black" type="text" name="name" onChange={event => this.setState({ mail: event.target.value})}></input>
						<div className="text-sm uppercase font-medium mb-1.5">Ваша почта:</div>

					</label>

					<label className="w-full mb-6 flex flex-col-reverse">

						<input className="pointer-events-all h-9 text-lg outline-none border-b-orange-400 border-b color-black" type="text" name="name" onChange={event => this.setState({ address: event.target.value})}></input>
						<div className="text-sm uppercase font-medium mb-1.5">Ваш адрес:</div>

					</label>

					<label className="w-full mb-6 flex flex-col-reverse">

						<input className="pointer-events-all h-9 text-lg outline-none border-b-orange-400 border-b color-black" type="text" name="password" onChange={event => this.setState({ userPassword: event.target.value})} />
						<div className="text-sm uppercase font-medium mb-1.5">Ваш пароль:</div>

					</label>

					<button className="w-full h-11 flex items-center justify-center border-solid border cursor-pointer uppercase border-grey-400 bg-orange-400 rounded-md"
						type="submit" 
						onClick={(e) => {
							this.postUserData(e);
							this.closePopup(); 
							this.myForm.reset();
						}}>Зарегистрироваться</button>
				</form>
			</div>
		);
	}

	postUserData(e) {
		e.preventDefault();
		axios({
			method: "POST",
			url: "http://localhost:3000/users",
			data: {
				firstName: this.state.userName,
				lastName: this.state.userLastName,
				mail: this.state.mail,
				address: this.state.address,
				password: this.state.userPassword,
			}

		}).then((resp) => console.log(resp.data));
		console.log("userData posted");
		console.log(this.state);
	}

	closePopup() {
		document.querySelector(".popup-bg").classList.remove("opacity-100", "pointer-events-auto");
		document.querySelector(".popup").classList.remove("opacity-100", "pointer-events-auto");
	}
}

export default AutorizationForm;