import { useEffect, useState } from 'react'
import './App.css'
import AppHeader from './components/AppHeader'
import MessageCard from './components/MessageCard'
import SurpriseButton from './components/SurpriseButton'
import { fetchMessagesFromGitHub } from './services/messagesApi'

function pickRandomMessage(messagesList, current = '') {
  if (messagesList.length === 0) {
    return 'Aun no hay mensajes en tu JSON.'
  }

  if (messagesList.length === 1) {
    return messagesList[0]
  }

  let nextMessage = current

  while (nextMessage === current) {
    const randomIndex = Math.floor(Math.random() * messagesList.length)
    nextMessage = messagesList[randomIndex]
  }

  return nextMessage
}

function App() {
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('Cargando tus mensajes...')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadMessages = async () => {
      try {
        const remoteMessages = await fetchMessagesFromGitHub()

        if (!isMounted) {
          return
        }

        setMessages(remoteMessages)
        setCurrentMessage(pickRandomMessage(remoteMessages))
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(loadError.message)
        setCurrentMessage('No pude cargar los mensajes desde GitHub por ahora.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSurpriseClick = () => {
    setCurrentMessage((previousMessage) => pickRandomMessage(messages, previousMessage))
  }

  return (
    <main className="app-shell">
      <section className="app-frame">
        <AppHeader />
        <MessageCard message={currentMessage} />
        {isLoading && <p className="status-text">Conectando con GitHub...</p>}
        {!isLoading && !error && (
          <p className="status-text">Mensajes disponibles: {messages.length}</p>
        )}
        {!isLoading && error && <p className="status-text status-error">{error}</p>}
        <SurpriseButton
          disabled={isLoading || messages.length === 0}
          onClick={handleSurpriseClick}
        />
      </section>
    </main>
  )
}

export default App
