import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { clearResults, getProjectResult, getProjectResults , getProjectResultStatus } from '../../Store/slices/Netx/projectResultsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ResultsHeader from '../../Components/Netx/ResultsHeader';
import ResultsTable from '../../Components/Netx/ResultsTable';
import { getAllProjects, getProject, getProjectStatus, getSpecificProject } from '../../Store/slices/Netx/netxProjectSlice';
import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../../Logic/axios';

const Result = () => {
  const { id } = useParams();
  const projectResults = useSelector((state: any) => state.ntxProjectResults.projectResult);
  const project = useSelector(getSpecificProject);
  const projectStatus = useSelector(getProjectStatus);
  const projectResultStatus = useSelector((state: any) => state.ntxProjectResults.resultStatus);
  const [buildings , setBuildings] = useState([]) as any;
  const [isLoadingBuildings , setIsLoadingBuildings] = useState(false);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProject({
      projectId: id
    }));
    dispatch(getProjectResults({
      projectId: id
    }));
  }, [id]);

  useEffect(() => {
    const getProjectBuildings = async () => {
      setIsLoadingBuildings(true);
      const buildingData = await Promise.all(
        project?.buildings?.map(async (buildingId: any) => {
          const { data } = await axiosInstance({
            url: `netx/building/${buildingId}`
          });
          return data.building;
        })
      );
      setBuildings(buildingData);
      setIsLoadingBuildings(false);
    };
    if (projectStatus === 'success' && project?.buildings) {
      getProjectBuildings();
    }
  }, [projectStatus, project?.buildings]);

  return (
    <div className='flex flex-col gap-8'>
      <ResultsHeader projectName={project?.projectName}/>
      {
        projectStatus === 'success' && projectResultStatus === 'success' && !isLoadingBuildings && buildings.length > 0 && (
          <ResultsTable project={project} buildings={buildings} projectResults={projectResults}/>
        )
      }
    </div>
  )
}

export default Result