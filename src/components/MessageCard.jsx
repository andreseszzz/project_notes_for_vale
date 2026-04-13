function MessageCard({ message }) {
  return (
    <article className="message-card" aria-live="polite">
      <p className="message-text">{message}</p>
    </article>
  )
}

export default MessageCard
