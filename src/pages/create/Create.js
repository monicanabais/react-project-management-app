import './Create.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('projects');
  const history = useHistory();

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category || assignedUsers.length < 1) {
      setFormError('Some fields are missing');
    } else {
      const createdBy = {
        displayName: user.displayName,
        id: user.uid,
        photoURL: user.photoURL
      };

      const assignedUsersList = assignedUsers.map(user => {
        return {
          displayName: user.value.displayName,
          id: user.value.id,
          photoURL: user.value.photoURL
        }
      });

      const project = {
        name,
        details,
        category: category.value,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        comments: [],
        createdBy: createdBy,
        assignedUsersList
      };

      await addDocument(project);
      if (!response.error) {
        history.push('/');
      } 
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name</span>
          <input type="text" required onChange={e => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Description</span>
          <textarea type="text" required onChange={e => setDetails(e.target.value)} value={details}></textarea>
        </label>
        <label>
          <span>Due date</span>
          <input type="date" required onChange={e => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Category</span>
          <Select options={categories} onChange={option => setCategory(option)} />
        </label>
        <label>
          <span>Assign to</span>
          <Select options={users} onChange={user => setAssignedUsers(user)} isMulti />
        </label>
        <button className="btn">Add project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create;