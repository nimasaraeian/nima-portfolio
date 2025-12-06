import { NextResponse } from 'next/server';

export function jsonResponse<T>(data: T, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set('Content-Type', 'application/json; charset=utf-8');
  return response;
}




