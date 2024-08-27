import Logger from "../src/index";

describe("Logger class", () => {
  it("can be instantiated", () => {
    const logger = new Logger("test");
    expect(logger).toBeInstanceOf(Logger);
  });

  it("logs properly with label function", () => {
    const spy = jest.spyOn(console, "log");
    const logger = new Logger("test");
    let i: number = 0;

    logger.label = () => {
      return `msg: ${++i}`;
    };

    logger.log("foo");
    logger.log("bar");
    logger.log("baz");
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenNthCalledWith(1, "[msg: 1] foo");
    expect(spy).toHaveBeenNthCalledWith(2, "[msg: 2] bar");
    expect(spy).toHaveBeenNthCalledWith(3, "[msg: 3] baz");
    expect(spy).toHaveBeenCalledTimes(3);
  });

  describe("static method CreateShortcuts", () => {
    it("returns expected methods", () => {
      const logger = new Logger("test");
      const shortcuts = Logger.CreateShortcuts(logger);

      expect(shortcuts).toHaveProperty("_");
      expect(shortcuts).toHaveProperty("_debug");
      expect(shortcuts).toHaveProperty("_error");
      expect(shortcuts).toHaveProperty("_info");
      expect(shortcuts).toHaveProperty("_warn");
    });
  });

  describe("static method Create", () => {
    it("returns expected object", () => {
      const shortcuts = Logger.Create("test");
      expect(shortcuts).toHaveProperty("_");
      expect(shortcuts).toHaveProperty("_debug");
      expect(shortcuts).toHaveProperty("_error");
      expect(shortcuts).toHaveProperty("_info");
      expect(shortcuts).toHaveProperty("_logger");
      expect(shortcuts).toHaveProperty("_warn");
    });
  });
});
