import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { createProject, getAllProjects, getCreateProjectStatus } from '../../Store/slices/Netx/netxProjectSlice';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const NetxCreateHeader = ({toggleModal , handleProjectName}: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const { projectName , buildings ,  } = useSelector((state) => state.ntxSelectedProject);
  const createProjectStatus = useSelector(getCreateProjectStatus);
  const projects = useSelector(getAllProjects);
  
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const handleSaveProject = () => {
    if(!projectName) {
      toast.error("Project name can not be empty"); 
      return;
    } 
    if(buildings.length === 0) {
      toast.error("Project have to be with one building at least"); 
      return;
    }
    dispatch(createProject({
      email: user.email, 
      projectName,
      buildings
    }))
  }
  return (
    <header className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-4'>
        <h1 className={`text-3xl font-bold ${theme==='light' ? 'text-title-light' : 'text-title-dark'} `}>
            Project Name: 
        </h1>
        <input placeholder='...' type="text" 
          className={`outline-none w-56 h-8 pl-4 caret-warning ${theme === 'light' ? 'bg-navbar-input-background-light text-black' : 'bg-navbar-input-background-dark text-gray-light'}
          rounded-lg placeholder:text-[#7C7C8D] placeholder:text-base border border-gray-light 
          `} 
          value={projectName}
          onChange={(e) => handleProjectName(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-center gap-2'>
          <button onClick={() => toggleModal()} className='flex py-5 px-4 w-[192px] h-[12px] rounded-[5px] items-center justify-center bg-primary text-white text-base font-medium'>
            Add A Building
        </button>
        {
          createProjectStatus === 'success' && (
            <Link to={`/netx/result/${projects[projects.length - 1]._id}`}>
              <button className='flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center bg-primary text-white text-base font-medium'>
                Gen-LAN Table
              </button>
            </Link>
          )
        }

        <button onClick={() => handleSaveProject()} className='bg-gray flex py-5 px-4 w-14 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
            {
              createProjectStatus === 'loading' ? ( <div className='inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'>
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'/>
              </div> ) : (<span>save</span>)
            }
        </button>
        </div>
    </header>
  )
}

export default NetxCreateHeader