#!/bin/bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTAwMjhiMGQ3NzZhYzQ1OWUxNDBlMiIsImlhdCI6MTc0NTg3OTgxOSwiZXhwIjoxNzQ1ODgzNDE5fQ.N-i7O15ZANVx901xQpP_R0EWIsH8R2kf7Jj7sYKQkYM" # Substitua com um token inválido
curl -X GET http://localhost:8080/protected \
     -H "Authorization: Bearer $TOKEN"
