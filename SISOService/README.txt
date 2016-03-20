npm install

npm start

Fixes :
Cleaned npm modules in AppData 
Updated project package.json with the mongo updates :
 "mongodb": "~1.4.4",
 "monk": "^1.0.1"
bson issue in the folder:
C:\Users\Padma\Learning\node-tutorial-2-restful-app-master\node_modules\bson\ext
changed content of index.js the lines with the following...

		bson = require('../browser_build/bson');
	