# Cadena-Nacional

## Conexión a la base de datos MongoDB

1. Copia `.env.example` a `.env` en la raíz del proyecto.
2. Dentro de `.env` pon tu cadena de conexión completa (reemplaza `<db_password>` por tu contraseña):

```
MONGODB_URI=mongodb+srv://alex:<db_password>@cadenanacional.wz8i9ey.mongodb.net/myDbName?retryWrites=true&w=majority
MONGODB_DBNAME=myDbName   # (opcional)
```

3. No subas el archivo `.env` a Git — ya está ignorado por `.gitignore`.

4. El proyecto carga `.env` automáticamente y se conecta a MongoDB antes de iniciar el servidor.

5. Uso en código:

```js
const db = require('./utils/db');

// Dentro de una ruta o controlador async:
await db.connect();
const database = db.getDb();
const users = await database.collection('users').find().toArray();
```
