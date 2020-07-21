import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  // nós não podemos usar o async await no useEffect.
  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `New Project ${Date.now()}`]);

    const reponse = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: 'Alexandre'
    });

    const project = reponse.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button onClick={handleAddProject}>Add Project</button>
    </>
  );
}

export default App;