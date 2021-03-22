import { existsSync } from 'fs';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import '@angular/localize/init';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as express from 'express';
import { environment } from '@env/environment';
import 'zone.js/dist/zone-mix';

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

const distFolder = join(process.cwd(), 'dist/d8base');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';

const domino = require('domino-custom-elements');
const EventTarget = require('domino-custom-elements/lib/EventTarget');
const NavigatorID = require('domino-custom-elements/lib/NavigatorID');
const { createElement, HTMLElement } = require('domino-custom-elements/lib/htmlelts');
const select = require('domino-custom-elements/lib/select');
const window = domino.createWindow(join(distFolder, indexHtml), environment.origin);
global['window'] = {
  ...window,
  ...domino.impl,
  HTMLElement,
  ...EventTarget.prototype,
  document: {
    ...window.document,
    baseURI: environment.origin,
    ...EventTarget.prototype,
    createElement: (doc, localName, prefix) => {
      const _customElementRegistry = doc._customElementRegistry ?? { get: () => {} };
      const implementation = doc.implementation ?? { mozHTMLParser: domino.impl.HTMLParser };
      const adoptNode = doc.adoptNode ?? window.document.adoptNode;
      return createElement({ ...doc, _customElementRegistry, implementation, adoptNode }, localName, prefix);
    },
    querySelectorAll: selector => {
      const nodes = select(selector, window.document);
      return nodes.item ? nodes : new domino.impl.NodeList(nodes);
    },
    head: {
      attachShadow: () => {},
      querySelector: () => {},
      insertBefore: () => {},
      childNodes: [],
    },
  },
  customElements: domino.customElements,
  matchMedia: () => true,
  screen: {},
  navigator: {
    ...window.navigator,
    appCodeName: 'Mozilla',
    appName: 'Netscape',
    appVersion: '4.0',
    platform: '',
    product: 'Gecko',
    productSub: '20100101',
    userAgent: '',
    vendor: '',
    vendorSub: '',
    taintEnabled: () => false,
  },
};
global['self'] = global['window'];
copyProps(global['window'], global);

import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: REQUEST, useValue: req },
        { provide: RESPONSE, useValue: res },
      ],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
