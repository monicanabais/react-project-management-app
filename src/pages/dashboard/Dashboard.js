import './Dashboard.css';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const Dashboard = () => {
  const { documents, error} = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = filter => {
    setCurrentFilter(filter)
  }

  const filteredProjects = documents ? documents.filter(document => {
    switch (currentFilter){
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })

        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Current projects</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}

export default Dashboard;
