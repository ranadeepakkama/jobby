import {Component} from 'react'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'
import ProfileCart from '../ProfileCart'
import FilterEmployeType from '../FilterEmployeType'
import JobList from '../JobList'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: [],
    listOfJobs: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobList()
    this.getJobDetails()
  }

  getChangedFilterValue = type => {
    this.setState(
      pvrState => ({
        employmentType: [...pvrState.employmentType, type],
      }),
      this.getJobDetails,
    )
  }

  getChangedSalaryValue = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentType, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        listOfJobs: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    const {listOfJobs, searchInput} = this.state
    const filterResult = listOfJobs.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({listOfJobs: filterResult})
  }

  submitSuccess = modifiedProfileDetails =>
    this.setState({profile: modifiedProfileDetails})

  submitRetry = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  getResponseList = () => {
    const {listOfJobs} = this.state
    if (listOfJobs === undefined) {
      return (
        <div>
          <h1>Something went wrong</h1>
        </div>
      )
    } else if (listOfJobs.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No job Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    } else {
      return (
        <div>
          <ul>
            {listOfJobs.map(item => (
              <JobList item={item} key={item.id} />
            ))}
          </ul>
        </div>
      )
    }
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details

    const modifiedProfileDetails = {
      profileImageUrl: profileDetails.profile_image_url,
      name: profileDetails.name,
      shortBio: profileDetails.short_bio,
    }

    if (response.ok === true) {
      this.submitSuccess(modifiedProfileDetails)
    } else {
      this.submitRetry()
    }
  }

  getJobList = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {jobs} = data
    if (response.ok === true) {
      const newJobItems = jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        location: eachItem.location,
      }))

      this.setState({listOfJobs: newJobItems})
    }
  }

  renderJobDetails = () => (
    <div className="cart-2">
      <div className="input-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeSearchInput}
        />
        <button
          data-testid="searchButton"
          className="search-butn"
          type="button"
          onClick={this.onClickSearchInput}
        >
          <IoIosSearch />
        </button>
      </div>
      <div className="job-list">{this.getResponseList()}</div>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Oval type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {profile} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="cart-1">
            <div className="profile-container">
              {profile === undefined ? (
                this.submitRetry()
              ) : (
                <ProfileCart profileData={profile} />
              )}
            </div>
            <hr />
            <div className="type-of-empy-cart">
              <FilterEmployeType
                getChangedFilterValue={this.getChangedFilterValue}
                getChangedSalaryValue={this.getChangedSalaryValue}
              />
            </div>
          </div>
          {this.renderJobProfileDetailsList()}
        </div>
      </>
    )
  }
}

export default Jobs
