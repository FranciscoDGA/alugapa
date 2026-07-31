import { Logger } from "./logger";

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ErrorHandler {
  static handle(error: any) {
    if (error instanceof ApiError) {
      Logger.warn(`Operational Error: ${error.message}`, { stack: error.stack });
      return { success: false, message: error.message, status: error.statusCode };
    }
    
    // Zod Validation Error checking can go here
    if (error.name === "ZodError") {
      Logger.warn(`Validation Error`, { details: error.errors });
      return { success: false, message: "Dados inválidos", status: 400 };
    }

    Logger.error("Unhandled Exception", error);
    return { success: false, message: "Erro interno no servidor", status: 500 };
  }
}
