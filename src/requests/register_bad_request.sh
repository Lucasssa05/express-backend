
curl -X POST http://localhost:8080/register \
     -H "Content-Type: application/json" \
     -d '{"name": "Lucas", "email": "lucas@example.com", "password": }' # Faltando valor no campo password
