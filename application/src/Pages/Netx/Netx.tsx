
import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NetxHeader from '../../Components/Netx/NetxHeader';
import Table from '../../Components/Netx/Table';
import { fetchProjects, getAllProjects, getProjectsStatus , deleteProject, getDeleteProjectStatus } from '../../Store/slices/Netx/netxProjectSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const Netx = () => {
 const isSidebarOpen = useSelector((state: any) => state.sidebar.isSidebarOpen); 
 const theme = useSelector((state: any) => state.theme.theme);
 const { user , isLoading } = useAuth0();
 const dispatch = useDispatch();
 const projectsStatus = useSelector(getProjectsStatus);
 const deleteStatus = useSelector(getDeleteProjectStatus);
 const projects = useSelector(getAllProjects) as any;

 useEffect(() => { 
  if(projectsStatus === 'idle') {
    user && dispatch(fetchProjects(user?.email))
  }
 } , [projectsStatus , dispatch , isLoading])

 const handleDelete = (id: string) => {
  dispatch(deleteProject({
    email: user?.email, 
    projectId: id
  })) ; 
  console.log(deleteStatus);
  
  if(deleteStatus === 'success') {
    toast.success("Project deleted successfully")
  }
  if(deleteStatus === 'error') {
    toast.error("Something went wrong");
  }
 }

  return (
    <main className={`p-6 ${theme==='light' ? 'bg-app-background-light' : 'bg-app-background-dark'}  h-screen flex flex-col gap-12`}>
      <NetxHeader />
      {
        projectsStatus === 'loading' && (
          <h1> Loading </h1>
        )
      }
      {
        projectsStatus === 'succeeded' && (
          projects.length === 0 ? (
            <h1> No projects Yet </h1>
          ) : (
            <Table projects={projects} deleteProject={(id: string) => handleDelete(id)}/>
          )
        )
      }
      
    </main>
  )
}

export default Netx;