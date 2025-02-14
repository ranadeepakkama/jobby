import {IoIosStarOutline} from 'react-icons/io'
import {MdPinDrop} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobList = props => {
  const {item} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
  } = item

  const companyItems = () => (
    <div className="company-cart">
      <div className="company-details">
        <img className="company-logo" src={companyLogoUrl} alt="company logo" />
        <div className="title-rating">
          <h1 className="header">{title}</h1>
          <div className="rating">
            <IoIosStarOutline /> <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-package-container">
        <div className="location-empType-container">
          <p className="location">
            <MdPinDrop />
            {location}
          </p>
          <p>
            <BsBriefcaseFill /> {employmentType}
          </p>
        </div>
        <div>
          <p>{packagePerAnnum}</p>
        </div>
      </div>
      <hr />
      <div className="Description-conatiner">
        <h1 className="decp-header">Description</h1>
        <p>{jobDescription}</p>
      </div>
    </div>
  )

  return (
    <div className="list-container">
      <Link to={`/jobs/${id}`}>
        <li className="list-items">{companyItems()}</li>
      </Link>
    </div>
  )
}

export default JobList
