import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const expressLayouts = require('express-ejs-layouts');
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { config } from './config/config';
import pageRouter from './routes/index';
import apiRouter from './routes/api';
import { errorHandler, notFound } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();

// Security & performance
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// Logging
if (config.isDev) app.use(morgan('dev'));
else app.use(morgan('combined'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Routes
app.use('/', pageRouter);
app.use('/api', apiLimiter, apiRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`\n🌿 NutriVita sunucusu başlatıldı`);
  console.log(`📍 http://localhost:${config.port}`);
  console.log(`🔧 Ortam: ${config.nodeEnv}\n`);
});

export default app;
