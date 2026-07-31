export class Logger {
  static info(message: string, meta?: any) {
    console.info(JSON.stringify({ level: 'info', message, meta, timestamp: new Date() }));
  }

  static warn(message: string, meta?: any) {
    console.warn(JSON.stringify({ level: 'warn', message, meta, timestamp: new Date() }));
  }

  static error(message: string, error?: any, meta?: any) {
    console.error(JSON.stringify({ level: 'error', message, error, meta, timestamp: new Date() }));
  }

  static debug(message: string, meta?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(JSON.stringify({ level: 'debug', message, meta, timestamp: new Date() }));
    }
  }
}
