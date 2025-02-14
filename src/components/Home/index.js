import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="details">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <div className="butn-container">
          <Link to="/jobs">
            <button type="button">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
