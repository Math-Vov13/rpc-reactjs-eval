import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);
  res.status(500).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Internal Server Error',
      data: error.message
    },
    id: null
  });
};