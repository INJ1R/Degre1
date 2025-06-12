import React from "react";
import axios from "axios";

class LoginForm extends React.Component {
  state = {
    mail: "",
    password: "",
    error: null
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://degree-10ur.onrender.com/login', {
        mail: this.state.mail,
        password: this.state.password
      });
      this.props.onLogin(response.data);
    } catch (error) {
      this.setState({ error: error.response?.data?.error || 'Login failed' });
    }
  };

  render() {
    return (
      <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
        <form
          className="bg-white p-6 rounded-xl w-full max-w-md"
          onSubmit={this.handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Вход</h2>
          
          {this.state.error && (
            <div className="text-red-500 mb-4">{this.state.error}</div>
          )}

          <label className="w-full mb-6 flex flex-col-reverse">
            <input
              className="h-9 text-lg outline-none border-b-orange-400 border-b"
              type="email"
              required
              onChange={(e) => this.setState({ mail: e.target.value })}
            />
            <div className="text-sm uppercase font-medium mb-1.5">Ваша почта:</div>
          </label>

          <label className="w-full mb-6 flex flex-col-reverse">
            <input
              className="h-9 text-lg outline-none border-b-orange-400 border-b"
              type="password"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <div className="text-sm uppercase font-medium mb-1.5">Ваш пароль:</div>
          </label>

          <div className="flex gap-2">
            <button
              className="w-full h-11 flex items-center justify-center border cursor-pointer uppercase bg-orange-400 rounded-md"
              type="submit"
            >
              Войти
            </button>
            <button
              className="w-full h-11 flex items-center justify-center border cursor-pointer uppercase bg-gray-200 rounded-md"
              type="button"
              onClick={this.props.onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;