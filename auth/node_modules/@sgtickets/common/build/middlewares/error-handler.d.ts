import { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: Error, req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, res: Response<any>, next: NextFunction) => Response<any> | undefined;
