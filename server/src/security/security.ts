import { Application } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import hpp from 'hpp';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import compression from 'compression';
 
const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,  
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

const slowDownMiddleware = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 100,
  delayMs: 500,
});

const configureSecurity = (app: Application): void => {
  app.disable('x-powered-by');

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
    referrerPolicy: { policy: 'no-referrer' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    ieNoOpen: true,
    noSniff: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
  }));

  app.use(cors(corsOptions));
  app.use(hpp());
  app.use(xssClean());
  app.use(mongoSanitize());
  app.use(compression());
  app.use(rateLimiter);
  app.use(slowDownMiddleware);
};

export default configureSecurity;
