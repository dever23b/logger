enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    LOG = 2,
    WARN = 4,
    ERROR = 8,
  }
  
  export function createLogger(name: string) {
    const _logger = new Logger(name);
    return {
      _logger,
      ...createLoggerShortcuts(_logger),
    };
  }
  
  export function createLoggerShortcuts(logger: Logger) {
    return {
      _: logger.log.bind(logger),
      _debug: logger.debug.bind(logger),
      _error: logger.error.bind(logger),
      _info: logger.info.bind(logger),
      _warn: logger.warn.bind(logger),
    };
  }
  
  export class Logger {
    label: string = "";
  
    constructor(label: string) {
      this.#init.call(this, label);
    }
  
    #init(label?: string) {
      if (label) {
        this.label = label;
      } else {
        this.label = arguments.callee.arguments.callee.caller;
      }
    }
  
    #output(type: LogLevel, args: any) {
      try {
        let isFirstArgString =
          typeof args[0] === "string" || args[0] instanceof String;
  
        if (type == LogLevel.DEBUG) {
          if (isFirstArgString) {
            args[0] = `[DEBUG] ${args[0]}`;
          } else {
            args.unshift("[DEBUG]");
          }
        }
  
        if (isFirstArgString) {
          args[0] = `[${this.label}] ${args[0]}`;
        } else {
          args.unshift(`[${this.label}]`);
        }
  
        let method: keyof Console;
        switch (type) {
          case LogLevel.DEBUG:
            method = "debug";
            break;
          case LogLevel.ERROR:
            method = "error";
            break;
          case LogLevel.INFO:
            method = "info";
            break;
          case LogLevel.LOG:
            method = "log";
            break;
          case LogLevel.WARN:
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
      this.#output(LogLevel.DEBUG, args);
    }
  
    error(...args: any[]) {
      this.#output(LogLevel.ERROR, args);
    }
  
    group(label: string = "") {
      console.group(`[${this.label}] ${label}`);
    }
  
    groupCollapsed(label: string = "") {
      console.groupCollapsed(`[${this.label}] ${label}`);
    }
  
    groupEnd() {
      console.groupEnd();
    }
  
    info(...args: any[]) {
      this.#output(LogLevel.INFO, args);
    }
  
    log(...args: any[]) {
      this.#output(LogLevel.LOG, args);
    }
  
    time(label: string = "") {
      console.time(`[${this.label}] ${label}`);
    }
    timeEnd(label: string = "") {
      console.timeEnd(`[${this.label}] ${label}`);
    }
    timeLog(label: string = "") {
      console.timeLog(`[${this.label}] ${label}`);
    }
    warn(...args: any[]) {
      this.#output(LogLevel.WARN, args);
    }
  }
  
  export default Logger;