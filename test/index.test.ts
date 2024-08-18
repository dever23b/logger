import Logger from "../src/index";

describe("testing index file", () => {
  test("Logger class can be instantiated", () => {
    const logger = new Logger("test");
    expect(logger).toBeInstanceOf(Logger);
  });

  test("CreateShortcuts returns expected methods", () => {
    const logger = new Logger("test");
    const shortcuts = Logger.CreateShortcuts(logger);

    expect(shortcuts).toHaveProperty("_");
    expect(shortcuts).toHaveProperty("_debug");
    expect(shortcuts).toHaveProperty("_error");
    expect(shortcuts).toHaveProperty("_info");
    expect(shortcuts).toHaveProperty("_warn");
  });

  test("Create returns expected object", () => {
    const shortcuts = Logger.Create("test");
    expect(shortcuts).toHaveProperty("_");
    expect(shortcuts).toHaveProperty("_debug");
    expect(shortcuts).toHaveProperty("_error");
    expect(shortcuts).toHaveProperty("_info");
    expect(shortcuts).toHaveProperty("_logger");
    expect(shortcuts).toHaveProperty("_warn");
  });
});
