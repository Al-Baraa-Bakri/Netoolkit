import express from 'express'; 
import { expressjwt } from 'express-jwt'; 
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();
const authDomain = process.env.AUTH0_DOMIN;

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authDomain}/.well-known/jwks.json`
  }) as any,
  audience: process.env.AUTH0_INDENTIFIER,
  issuer: authDomain,
  algorithms: ['RS256']
});