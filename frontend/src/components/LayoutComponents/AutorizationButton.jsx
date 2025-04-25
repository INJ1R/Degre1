import React from "react";
import AutorizationForm from "./AutorizationForm";
import {UserOutlined} from "@ant-design/icons";
import {Button} from "antd";

class AutorizationButton extends React.Component {

	render() {
		return (
			<div>
				<Button className='bg-orange-400 text-gray-50 ml-3' onClick={this.openPopup}><UserOutlined />Зарегистрироваться</Button>
				<AutorizationForm />   
			</div>
		);
	}

	openPopup() {
		document.querySelector(".popup-bg").classList.add("opacity-100", "pointer-events-auto");
		document.querySelector(".popup").classList.add("opacity-100", "pointer-events-auto");
	}

}

export default AutorizationButton;