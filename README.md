# Cartas del Corazon

Aplicacion romantica en React + Vite.

## Configuracion de mensajes remotos

1. Crea un archivo en GitHub con una lista JSON de textos, por ejemplo:

[
	"Eres mi lugar favorito 💖",
	"Cada dia contigo es un regalo 🎁",
	"Me encantas incluso en mis pensamientos mas distraidos 😏"
]

2. Usa la URL RAW publica de ese JSON.

3. Crea un archivo `.env` en la raiz del proyecto y configura:

VITE_MESSAGES_URL=https://raw.githubusercontent.com/USUARIO/REPO/main/data/messages.json

4. Inicia el proyecto:

npm run dev

La app hara fetch de ese JSON y mostrara el primer mensaje disponible.
