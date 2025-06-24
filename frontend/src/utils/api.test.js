const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { handleRequest, getData, selectedItems } = require("./requests");

describe("API функции", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  // Тест 1: Проверяет, что handleRequest возвращает данные при успешном запросе
  test("Успешный запрос возвращает данные", async () => {
    const data = [{ id: 1, name: "Test Product" }];
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, data);

    const response = await handleRequest(
      axios.get("http://localhost:3000/knittedProducts")
    );
    expect(response).toEqual(data);
  });

  // Тест 2: Проверяет, что getData возвращает данные для всех категорий при успешных запросах
  test("Успешное получение данных для всех категорий", async () => {
    const mockData = [{ id: 1, name: "Product" }];
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, mockData);
    mock.onGet("http://localhost:3000/ceramics").reply(200, mockData);
    mock.onGet("http://localhost:3000/jewelry").reply(200, mockData);
    mock.onGet("http://localhost:3000/decor").reply(200, mockData);
    mock.onGet("http://localhost:3000/textiles").reply(200, mockData);
    mock.onGet("http://localhost:3000/soap").reply(200, mockData);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, mockData);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: mockData,
      ceramicsData: mockData,
      jewelryData: mockData,
      decorData: mockData,
      textilesData: mockData,
      soapData: mockData,
      woodenProductsData: mockData,
    });
  });

  // Тест 3: Проверяет, что getData возвращает пустые массивы при ошибке в knittedProducts
  test("Ошибка в запросе knittedProducts возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(500, {});
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 4: Проверяет, что getData возвращает пустые массивы при ошибке в ceramics
  test("Ошибка в запросе ceramics возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(500, {});
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 5: Проверяет, что getData возвращает пустые массивы при ошибке в jewelry
  test("Ошибка в запросе jewelry возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(500, {});
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 6: Проверяет, что getData возвращает пустые массивы при ошибке в decor
  test("Ошибка в запросе decor возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(500, {});
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 7: Проверяет, что getData возвращает пустые массивы при ошибке в textiles
  test("Ошибка в запросе textiles возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(500, {});
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 8: Проверяет, что getData возвращает пустые массивы при ошибке в soap
  test("Ошибка в запросе soap возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(500, {});
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 9: Проверяет, что getData возвращает пустые массивы при ошибке в woodenProducts
  test("Ошибка в запросе woodenProducts возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(500, {});

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 10: Проверяет, что getData возвращает пустые массивы при всех ошибочных запросах
  test("Все запросы с ошибками возвращают пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(500, {});
    mock.onGet("http://localhost:3000/ceramics").reply(500, {});
    mock.onGet("http://localhost:3000/jewelry").reply(500, {});
    mock.onGet("http://localhost:3000/decor").reply(500, {});
    mock.onGet("http://localhost:3000/textiles").reply(500, {});
    mock.onGet("http://localhost:3000/soap").reply(500, {});
    mock.onGet("http://localhost:3000/woodenProducts").reply(500, {});

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 11: Проверяет, что selectedItems имеет правильное значение
  test("selectedItems содержит правильный URL", () => {
    expect(selectedItems).toBe("http://localhost:3000/selectedItems");
  });

  // Тест 12: Проверяет, что handleRequest обрабатывает запрос с пустым ответом
  test("handleRequest обрабатывает пустой ответ", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, []);

    const response = await handleRequest(
      axios.get("http://localhost:3000/knittedProducts")
    );
    expect(response).toEqual([]);
  });

  // Тест 13: Проверяет, что getData возвращает пустые массивы при ошибке в knittedProducts
  test("Только knittedProducts с ошибкой возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(500, {});
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 14: Проверяет, что getData логирует данные для knittedProducts
  test("getData логирует knittedProductsData", async () => {
    const mockData = [{ id: 1, name: "Product" }];
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, mockData);
    mock.onGet("http://localhost:3000/ceramics").reply(200, mockData);
    mock.onGet("http://localhost:3000/jewelry").reply(200, mockData);
    mock.onGet("http://localhost:3000/decor").reply(200, mockData);
    mock.onGet("http://localhost:3000/textiles").reply(200, mockData);
    mock.onGet("http://localhost:3000/soap").reply(200, mockData);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, mockData);

    const consoleSpy = jest.spyOn(console, "log");
    await getData();
    expect(consoleSpy).toHaveBeenCalledWith(mockData);
    consoleSpy.mockRestore();
  });

  // Тест 15: Проверяет, что handleRequest корректно обрабатывает статус 201
  test("handleRequest обрабатывает статус 201", async () => {
    const data = [{ id: 1, name: "Test Product" }];
    mock.onGet("http://localhost:3000/knittedProducts").reply(201, data);

    const response = await handleRequest(
      axios.get("http://localhost:3000/knittedProducts")
    );
    expect(response).toEqual(data);
  });

  // Тест 16: Проверяет, что getData возвращает пустые массивы при ошибке в ceramics
  test("Только ceramics с ошибкой возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(500, {});
    mock.onGet("http://localhost:3000/jewelry").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 17: Проверяет, что getData возвращает пустые массивы при ошибке в jewelry
  test("Только jewelry с ошибкой возвращает пустые массивы", async () => {
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/ceramics").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/jewelry").reply(500, {});
    mock.onGet("http://localhost:3000/decor").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/textiles").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/soap").reply(200, [{ id: 1 }]);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, [{ id: 1 }]);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: [],
      ceramicsData: [],
      jewelryData: [],
      decorData: [],
      textilesData: [],
      soapData: [],
      woodenProductsData: [],
    });
  });

  // Тест 18: Проверяет, что getData корректно обрабатывает пустые ответы для всех категорий
  test("Пустые ответы для всех категорий возвращаются корректно", async () => {
    const mockData = [];
    mock.onGet("http://localhost:3000/knittedProducts").reply(200, mockData);
    mock.onGet("http://localhost:3000/ceramics").reply(200, mockData);
    mock.onGet("http://localhost:3000/jewelry").reply(200, mockData);
    mock.onGet("http://localhost:3000/decor").reply(200, mockData);
    mock.onGet("http://localhost:3000/textiles").reply(200, mockData);
    mock.onGet("http://localhost:3000/soap").reply(200, mockData);
    mock.onGet("http://localhost:3000/woodenProducts").reply(200, mockData);

    const result = await getData();
    expect(result).toEqual({
      knittedProductsData: mockData,
      ceramicsData: mockData,
      jewelryData: mockData,
      decorData: mockData,
      textilesData: mockData,
      soapData: mockData,
      woodenProductsData: mockData,
    });
  });

  // Тест 19: Проверяет, что handleRequest обрабатывает ответ с заголовками
  test("handleRequest обрабатывает ответ с заголовками", async () => {
    const data = [{ id: 1, name: "Test Product" }];
    mock
      .onGet("http://localhost:3000/knittedProducts")
      .reply(200, data, { "content-type": "application/json" });

    const response = await handleRequest(
      axios.get("http://localhost:3000/knittedProducts")
    );
    expect(response).toEqual(data);
  });

  // Тест 20: Проверяет, что selectedItems является строкой
  test("selectedItems является строкой", () => {
    expect(typeof selectedItems).toBe("string");
  });
});
