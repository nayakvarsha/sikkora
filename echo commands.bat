# Create the server.js file with content
echo const express = require('express'); > server.js
echo const cors = require('cors'); >> server.js
echo. >> server.js
echo const app = express(); >> server.js
echo const PORT = 4000; >> server.js
echo. >> server.js
echo app.use(cors()); >> server.js
echo app.use(express.json()); >> server.js
echo. >> server.js
echo app.get('/', (req, res) => { >> server.js
echo   res.json({ message: 'Monastery360 Backend is running!' }); >> server.js
echo }); >> server.js
echo. >> server.js
echo app.get('/health', (req, res) => { >> server.js
echo   res.json({ status: 'OK', service: 'Monastery360 Backend' }); >> server.js
echo }); >> server.js
echo. >> server.js
echo app.listen(PORT, () => { >> server.js
echo   console.log('🚀 Server started on http://localhost:' + PORT); >> server.js
echo }); >> server.js