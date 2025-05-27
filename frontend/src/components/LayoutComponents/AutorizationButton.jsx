import React from "react";
import AuthorizationForm from "./AutorizationForm";
import LoginForm from "./LoginForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

class AuthorizationButton extends React.Component {
  state = {
    showAuthForm: false,
    showLoginForm: false,
    isLoggedIn: false,
    user: null,
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ isLoggedIn: true, user: JSON.parse(user) });
    }
  }

  openAuthPopup = () => {
    this.setState({ showAuthForm: true });
  };

  openLoginPopup = () => {
    this.setState({ showLoginForm: true });
  };

  closePopup = () => {
    this.setState({ showAuthForm: false, showLoginForm: false });
  };

  handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ isLoggedIn: true, user, showLoginForm: false });
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ isLoggedIn: false, user: null });
  };

  render() {
    const { isLoggedIn, user, showAuthForm, showLoginForm } = this.state;

    if (isLoggedIn) {
      return (
        <div className="flex items-center ml-3">
          <span className="mr-2">{user.firstName}</span>
          <Button
            className="bg-orange-400 text-gray-50"
            onClick={this.handleLogout}
          >
            <LogoutOutlined />
            Выйти
          </Button>
        </div>
      );
    }

    return (
      <div className="flex">
        <Button
          className="bg-orange-400 text-gray-50 ml-3"
          onClick={this.openLoginPopup}
        >
          <UserOutlined />
          Войти
        </Button>
        <Button
          className="bg-orange-400 text-gray-50 ml-3"
          onClick={this.openAuthPopup}
        >
          <UserOutlined />
          Зарегистрироваться
        </Button>
        {showAuthForm && <AuthorizationForm onClose={this.closePopup} />}
        {showLoginForm && (
          <LoginForm onClose={this.closePopup} onLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default AuthorizationButton;
