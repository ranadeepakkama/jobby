import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <div className="skill-cart">
      <li className="icon-list">
        <div>
          <img src={imageUrl} alt={name} />
          <p>{name}</p>
        </div>
      </li>
    </div>
  )
}

export default SkillsCard
