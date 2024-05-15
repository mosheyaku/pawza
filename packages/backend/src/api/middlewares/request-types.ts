import type { RequestHandler } from 'express';

export const requestQueryType: <T>() => RequestHandler<Record<string, string>, unknown, unknown, T> =
  () => (req, response, next) =>
    next();

export const requestBodyType: <T>() => RequestHandler<Record<string, string>, unknown, T> = () => (req, res, next) =>
  next();

export const requestType: <Params = unknown, ResBody = any, Body = unknown, Query = unknown>() => RequestHandler<
  Params,
  ResBody,
  Body,
  Query
> = () => (req, res, next) => next();
