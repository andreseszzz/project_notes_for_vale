function SurpriseButton({ disabled, onClick }) {
  return (
    <button
      className="surprise-button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label="Mostrar otro mensaje romantico"
    >
      Sorprendeme 💌
    </button>
  )
}

export default SurpriseButton
