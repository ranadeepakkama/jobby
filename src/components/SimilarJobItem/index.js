import './index.css'
import {IoIosStarOutline} from 'react-icons/io'
import {MdPinDrop} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {companyLogoUrl, jobDescription, rating, location, title} = jobDetails

  return (
    <div className="SimilarJobItem-container">
      <div className="company-details">
        <img className="company-logo" src={companyLogoUrl} alt="company logo" />
        <div className="title-rating">
          <h1 className="header">{title}</h1>
          <div className="rating">
            <IoIosStarOutline /> <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div className="rating-jobtype">
        <p>
          <MdPinDrop />
          {location}
        </p>
        <p>
          <BsBriefcaseFill />
          {title}
        </p>
      </div>
    </div>
  )
}

export default SimilarJobItem
