function SurpriseButton({ disabled, onClick }) {
  return (
    <button className="surprise-button" type="button" disabled={disabled} onClick={onClick}>
      Sorprendeme 💌
    </button>
  )
}

export default SurpriseButton
