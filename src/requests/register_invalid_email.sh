
curl -X POST http://localhost:8080/register \
     -H "Content-Type: application/json" \
     -d '{"name": "Ana", "email": "ana.com", "password": "Senha123"}' # E-mail mal formatado
