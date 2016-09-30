import { declareChildApplication, start } from "single-spa";

declareChildApplication('alpha', () => System.import('/apps/alpha/main.js'), () => window.location.hash === '#/alpha');

declareChildApplication('beta', () => System.import('/apps/beta/main.js'), () => window.location.hash === '#/beta');

declareChildApplication('gamma', () => System.import('/apps/gamma/main.js'), () => true);

declareChildApplication('delta', () => System.import('/apps/delta/main.js'), () => window.location.hash === '#/delta');

declareChildApplication('omega', () => System.import('/apps/omega/main.js'), () => window.location.hash.indexOf('#/omega') == 0);

start();