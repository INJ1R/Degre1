import { Button, Modal } from "antd";
import React,{ useState } from "react";
const ModalHandler = ({children}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<div onClick={showModal}>
					{children}
				</div>
			</Modal>
		</>
	);
};
export default ModalHandler;