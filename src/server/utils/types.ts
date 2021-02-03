import type { TAuthors } from "../db/models";
import { Request } from 'express';

export interface IPayload {
    author_id?: number;
    uniq?: string;
    id?: number;
}

export interface ReqUser extends Request {
    user?: TAuthors
}