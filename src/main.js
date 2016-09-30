import { declareChildApplication, start } from "single-spa";

declareChildApplication('alpha', () => System.import('/apps/alpha/main.js'), () => window.location.search.indexOf('app=alpha') >= 0);

declareChildApplication('beta', () => System.import('/apps/beta/main.js'), () => window.location.search.indexOf('app=beta') >= 0);

declareChildApplication('gamma', () => System.import('/apps/gamma/main.js'), () => true);

declareChildApplication('delta', () => System.import('/apps/delta/main.js'), () => window.location.search.indexOf('app=delta') >= 0);

declareChildApplication('omega', () => System.import('/apps/omega/main.js'),  () => window.location.search.indexOf('app=crm') >= 0);

start();