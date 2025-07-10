import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

// ======================
// 1. Middleware Setup
// ======================
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors({ origin: true })); // CORS configuration
app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({ extended: true })); // Form data parsing

// ======================
// 2. API Endpoints
// ======================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Example API endpoint
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example API endpoint' });
});

// ======================
// 3. Static Files
// ======================
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    etag: true,
    lastModified: true,
  }),
);

// ======================
// 4. Angular SSR Handler
// ======================
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// ======================
// 5. Error Handling
// ======================
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// ======================
// 6. Server Startup
// ======================
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });
}

export const reqHandler = createNodeRequestHandler(app);