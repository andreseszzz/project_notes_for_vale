function MessageCard({ message }) {
  return (
    <article className="message-card" aria-live="polite">
      <p>{message}</p>
    </article>
  )
}

export default MessageCard
