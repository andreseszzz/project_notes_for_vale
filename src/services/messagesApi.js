const MESSAGES_URL = import.meta.env.VITE_MESSAGES_URL

export async function fetchMessagesFromGitHub() {
  if (!MESSAGES_URL) {
    throw new Error(
      'Falta configurar VITE_MESSAGES_URL en tu archivo .env con la URL RAW del JSON en GitHub.',
    )
  }

  const response = await fetch(MESSAGES_URL, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub respondio con error ${response.status}.`)
  }

  const data = await response.json()

  if (!Array.isArray(data) || !data.every((item) => typeof item === 'string')) {
    throw new Error('El JSON remoto debe ser un arreglo de textos.')
  }

  return data
}
