import { NextFunction, Request, Response } from 'express'
import getRawBody from 'raw-body'
import contentType from 'content-type';

export const rawBody = (req: Request, res: Response, next: NextFunction) => {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(req).parameters.charset
  }, (err, string) => {
    if (err) return next(err);
    //@ts-ignore
    req.text = string
    next()
  })
}