import { useEffect, useState } from 'react'
import './App.css'
import AppHeader from './components/AppHeader'
import MessageCard from './components/MessageCard'
import PhotoGrid from './components/PhotoGrid'
import SurpriseButton from './components/SurpriseButton'
import { fetchMessagesFromGitHub } from './services/messagesApi'

function pickRandomIndex(items) {
  return Math.floor(Math.random() * items.length)
}

function App() {
  const [messages, setMessages] = useState([])
  const [remainingMessages, setRemainingMessages] = useState([])
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

        if (remoteMessages.length === 0) {
          setMessages([])
          setRemainingMessages([])
          setCurrentMessage('Aun no hay mensajes en tu JSON.')
          return
        }

        const firstMessageIndex = pickRandomIndex(remoteMessages)
        const firstMessage = remoteMessages[firstMessageIndex]
        const nextRemainingMessages = remoteMessages.filter((_, index) => index !== firstMessageIndex)

        setMessages(remoteMessages)
        setRemainingMessages(nextRemainingMessages)
        setCurrentMessage(firstMessage)
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
    setRemainingMessages((previousRemainingMessages) => {
      if (previousRemainingMessages.length === 0) {
        return previousRemainingMessages
      }

      const nextMessageIndex = pickRandomIndex(previousRemainingMessages)
      const nextMessage = previousRemainingMessages[nextMessageIndex]

      setCurrentMessage(nextMessage)

      return previousRemainingMessages.filter((_, index) => index !== nextMessageIndex)
    })
  }

  return (
    <main className="app-shell">
      <section className="app-frame">
        <AppHeader />
        <MessageCard message={currentMessage} />
        <SurpriseButton
          disabled={isLoading || remainingMessages.length === 0}
          onClick={handleSurpriseClick}
        />
        {isLoading && <p className="status-text">Conectando con GitHub...</p>}
        {!isLoading && !error && (
          <p className="status-text">Mensajes disponibles: {remainingMessages.length}</p>
        )}
        {!isLoading && error && <p className="status-text status-error">{error}</p>}
        <PhotoGrid />
      </section>
    </main>
  )
}

export default App
