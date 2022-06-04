const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = ({ currentFilter, changeFilter }) => {

  const handleClick = filter => {
    changeFilter(filter)
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map(filter => (
          <button className={currentFilter === filter ? 'active' : ''} key={filter} onClick={() => handleClick(filter)}>
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilter