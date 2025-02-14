import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const getFilterEmployeType = props => {
  const {getChangedFilterValue} = props
  const onChangeEmployType = event => {
    getChangedFilterValue(event.target.value)
  }
  return (
    <div className="employ-list-cart">
      {employmentTypesList.map(employ => (
        <li className="checkbox-list" key={employ.employmentTypeId}>
          <input
            type="checkbox"
            className="input-cart"
            id={employ.employmentTypeId}
            onChange={onChangeEmployType}
            value={employ.employmentTypeId}
          />
          <label htmlFor={employ.employmentTypeId}>{employ.label}</label>
        </li>
      ))}
    </div>
  )
}

const getSalaryRangesList = props => {
  const {getChangedSalaryValue} = props
  const onChangeSalaryType = event => {
    getChangedSalaryValue(event.target.value)
  }
  return (
    <div className="employ-list-cart">
      {salaryRangesList.map(salary => (
        <li className="checkbox-list" key={salary.salaryRangeId}>
          <input
            type="radio"
            className="input-cart"
            id={salary.salaryRangeId}
            onChange={onChangeSalaryType}
            value={salary.salaryRangeId}
          />
          <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
        </li>
      ))}
    </div>
  )
}

const FilterEmployeType = props => (
  <div>
    <h1 className="header-emply-filter">Type of Employment</h1>
    <ul>{getFilterEmployeType(props)}</ul>
    <hr />
    <h1 className="header-emply-filter">Salary Range</h1>
    <ul>{getSalaryRangesList(props)}</ul>
  </div>
)

export default FilterEmployeType
