Endpoints

Publicos:
  POST /api/auth/register            - Registrar usuario
  POST /api/auth/login               - Iniciar sesión

Protegidos:
  GET  /api/auth/profile             - Ver perfil
  PUT  /api/auth/profile             - Actualizar perfil
  PUT  /api/auth/change-password     - Cambiar contraseña

Administrativos:
  GET  /api/auth/admin/users         - Lista de usuarios (admin)

Health:
  GET  /api/health                   - Estado de la API

Certificados generados con openssl de git bash
