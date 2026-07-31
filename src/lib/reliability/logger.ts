type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogPayload {
  message: string;
  tenantId?: string;
  requestId?: string;
  userId?: string;
  context?: Record<string, any>;
}

/**
 * Utilitário Centralizado de Logs Estruturados (Reliability OS)
 * Formata os logs em JSON para serem injetados no Datadog/New Relic/Sentry futuramente
 */
export class Logger {
  private static formatLog(level: LogLevel, payload: LogPayload) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      environment: process.env.NODE_ENV || 'development',
      ...payload,
    };
    
    return JSON.stringify(logEntry);
  }

  static info(payload: LogPayload) {
    console.log(this.formatLog('INFO', payload));
  }

  static warn(payload: LogPayload) {
    console.warn(this.formatLog('WARN', payload));
  }

  static error(payload: LogPayload, error?: Error) {
    console.error(this.formatLog('ERROR', {
      ...payload,
      context: { ...payload.context, error: error?.message, stack: error?.stack }
    }));
  }

  static debug(payload: LogPayload) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatLog('DEBUG', payload));
    }
  }
}
