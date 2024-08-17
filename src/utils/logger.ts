import { StreamOptions } from 'morgan';

/**
 * This class is used for customizing log messages and printing them to the console.
 */
export class Logger {
  private _tag: string;
  /**
   * Creates a new instance of the Logger class with the specified tag.
   * @param tag The tag value used for customizing log messages.
   */
  constructor(tag: string) {
    this._tag = tag;
  }
  /**
   * Prints a success message to the console with a green color and the specified tag.
   * @param message The message to be printed.
   */
  public success(message: string | object): void {
    this.printMessage(message, "\x1b[32m");
  }
  /**
   * Prints an informational message to the console with a cyan color and the specified tag.
   * @param message The message to be printed.
   */
  public info(message: string | object): void {
    this.printMessage(message, "\x1b[36m");
  }
  /**
   * Prints a warning message to the console with a yellow color and the specified tag.
   * @param message The message to be printed.
   */
  public warn(message: string | object): void {
    this.printMessage(message, "\x1b[33m");
  }
  /**
   * Prints an error message to the console with a red color and the specified tag.
   * @param message The message to be printed.
   */
  public error(message: string | object): void {
    this.printMessage(message, "\x1b[31m");
  }
  /**
   * Prints the specified message to the console with the specified color and tag.
   * @param message The message to be printed.
   * @param color The color to be used for printing the message.
   */
  private printMessage(message: string | object, color: string): void {
    process.stdout.write(`\x1b[1m${color} [${this._tag}]  \x1b[0m`);
    console.log(`${color}%s\x1b[0m`, message);
  }
}

/**
 * This class used to pass only success execution of server
 */
export class SuccessStream implements StreamOptions {
    write(line: string): void {
        const date: Date = new Date();
        new Logger(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).success(line);
    }
}

/**
 * This class used to pass only execution error of server
 */
export class ErrorStream implements StreamOptions {
    write(line: string): void {
        const date: Date = new Date();
        new Logger(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).error(line);
    }
}