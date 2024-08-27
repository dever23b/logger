class Logger {
  label: string | Logger.LabelFunction = "";

  constructor(label: string) {
    this.#init.call(this, label);
  }

  #getLabel() {
    let label: string;
    if (typeof this.label === "string") {
      label = this.label;
    } else {
      label = this.label();
    }

    return `[${label}]`;
  }

  #init(label?: string) {
    if (label) {
      this.label = label;
    } else {
      this.label = arguments.callee.arguments.callee.caller;
    }
  }

  #output(type: Logger.Level, args: any) {
    try {
      let isFirstArgString =
        typeof args[0] === "string" || args[0] instanceof String;

      if (type == Logger.Level.DEBUG) {
        if (isFirstArgString) {
          args[0] = `[DEBUG] ${args[0]}`;
        } else {
          args.unshift("[DEBUG]");
        }
      }

      if (isFirstArgString) {
        args[0] = `${this.#getLabel()} ${args[0]}`;
      } else {
        args.unshift(`${this.#getLabel()}`);
      }

      let method: keyof Console;
      switch (type) {
        case Logger.Level.DEBUG:
          method = "debug";
          break;
        case Logger.Level.ERROR:
          method = "error";
          break;
        case Logger.Level.INFO:
          method = "info";
          break;
        case Logger.Level.LOG:
          method = "log";
          break;
        case Logger.Level.WARN:
          method = "warn";
          break;
        default:
          throw new TypeError("Invalid log message type");
      }
      console[method].apply(this, args);
    } catch (e: any) {
      console.error("Unable to create log message", e);
    }
  }

  debug(...args: any[]) {
    this.#output(Logger.Level.DEBUG, args);
  }

  error(...args: any[]) {
    this.#output(Logger.Level.ERROR, args);
  }

  group(label: string = "") {
    console.group(`${this.#getLabel()} ${label}`);
  }

  groupCollapsed(label: string = "") {
    console.groupCollapsed(`${this.#getLabel()} ${label}`);
  }

  groupEnd() {
    console.groupEnd();
  }

  info(...args: any[]) {
    this.#output(Logger.Level.INFO, args);
  }

  log(...args: any[]) {
    this.#output(Logger.Level.LOG, args);
  }

  time(label: string = "") {
    console.time(`${this.#getLabel()} ${label}`);
  }
  timeEnd(label: string = "") {
    console.timeEnd(`${this.#getLabel()} ${label}`);
  }
  timeLog(label: string = "") {
    console.timeLog(`${this.#getLabel()} ${label}`);
  }
  warn(...args: any[]) {
    this.#output(Logger.Level.WARN, args);
  }

  public static Create(name: string) {
    const _logger = new Logger(name);
    return {
      _logger,
      ...this.CreateShortcuts(_logger),
    };
  }

  public static CreateShortcuts(logger: Logger) {
    return {
      _: logger.log.bind(logger),
      _debug: logger.debug.bind(logger),
      _error: logger.error.bind(logger),
      _info: logger.info.bind(logger),
      _warn: logger.warn.bind(logger),
    };
  }
}

namespace Logger {
  export type LabelFunction = () => string;
  export enum Level {
    DEBUG = 0,
    INFO = 1,
    LOG = 2,
    WARN = 4,
    ERROR = 8,
  }
}

export default Logger;
