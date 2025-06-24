import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AuthorizationForm from "./AutorizationForm"; // Убедитесь в правильности имени файла
import "@testing-library/jest-dom";

process.env.VITE_API_URL = "http://localhost:3000/";

// Мокаем axios
jest.mock("axios");

describe("Компонент формы регистрации (AuthorizationForm)", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<AuthorizationForm onClose={mockOnClose} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Отображает все элементы формы", () => {
    expect(screen.getByText("Регистрация")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваше имя:")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваша фамилия:")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваша почта:")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваш адрес:")).toBeInTheDocument();
    expect(screen.getByLabelText("Ваш пароль:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Зарегистрироваться" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Отмена" })).toBeInTheDocument();
  });

  test("Корректно обновляет состояние при вводе данных", () => {
    fireEvent.change(screen.getByLabelText("Ваше имя:"), {
      target: { value: "Иван" },
    });
    fireEvent.change(screen.getByLabelText("Ваша фамилия:"), {
      target: { value: "Иванов" },
    });
    fireEvent.change(screen.getByLabelText("Ваша почта:"), {
      target: { value: "ivan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Ваш адрес:"), {
      target: { value: "ул. Тестовая, 1" },
    });
    fireEvent.change(screen.getByLabelText("Ваш пароль:"), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText("Ваше имя:")).toHaveValue("Иван");
    expect(screen.getByLabelText("Ваша фамилия:")).toHaveValue("Иванов");
    expect(screen.getByLabelText("Ваша почта:")).toHaveValue("ivan@test.com");
    expect(screen.getByLabelText("Ваш адрес:")).toHaveValue("ул. Тестовая, 1");
    expect(screen.getByLabelText("Ваш пароль:")).toHaveValue("password123");
  });

  test("Успешно отправляет форму и закрывает её", async () => {
    axios.post.mockResolvedValueOnce({});

    // Заполняем все обязательные поля
    fireEvent.change(screen.getByLabelText("Ваше имя:"), {
      target: { value: "Иван" },
    });
    fireEvent.change(screen.getByLabelText("Ваша фамилия:"), {
      target: { value: "Иванов" },
    });
    fireEvent.change(screen.getByLabelText("Ваша почта:"), {
      target: { value: "ivan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Ваш адрес:"), {
      target: { value: "ул. Тестовая, 1" },
    });
    fireEvent.change(screen.getByLabelText("Ваш пароль:"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Зарегистрироваться" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("register"),
        {
          firstName: "Иван",
          lastName: "Иванов",
          mail: "ivan@test.com",
          address: "ул. Тестовая, 1",
          password: "password123",
        }
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('Закрывает форму при нажатии "Отмена"', () => {
    fireEvent.click(screen.getByRole("button", { name: "Отмена" }));
    expect(mockOnClose).toHaveBeenCalled();
  });

});
