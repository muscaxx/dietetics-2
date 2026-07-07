import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export function errorHandler(err: AppError, req: Request, res: Response, _next: NextFunction): void {
  const status = err.status || 500;
  const message = err.message || 'Bir hata oluştu.';

  if (req.accepts('json') && req.path.startsWith('/api')) {
    res.status(status).json({ success: false, message });
    return;
  }

  res.status(status).render('error', {
    title: `${status} - ${status === 404 ? 'Sayfa Bulunamadı' : 'Sunucu Hatası'}`,
    status,
    message: status === 404 ? 'Aradığınız sayfa bulunamadı.' : 'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.',
  });
}

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  const err: AppError = new Error('Not Found');
  err.status = 404;
  next(err);
}
