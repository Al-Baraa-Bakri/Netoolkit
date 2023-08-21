import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Table = ({projects, deleteProject} : any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-t border-[#ececec]">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
          Project name
        </th>
        <th scope="col" className={`px-6 py-3 text-base ${theme === 'light' ? 'text-table-title-light' : 'text-table-title-dark'}`}>
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        { projects.map((p , i) => {
          return (
            <tr className={`${theme==='light' && (i % 2 === 0 || i === 0) ? 'bg-white' : theme==='light' && i % 2 === 0 ? 'bg-[#DDD]' : theme === 'dark' ? 'bg-gray-dark' : 'bg-[#DDD]'} border-b border-[#dbd3d3] cursor-pointer ${ i % 2 === 0 ? '' : '' } `}>
              <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3`}>{p.projectName}</td>
              <td className={`${theme==='light' ? 'text-table-text-light' : 'text-table-text-dark'} text-sm font-medium px-6 py-3 flex items-center gap-4`}>
                <Link to={`/netx/result/${p._id}`}>
                <button className='bg-primary flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
                    View Results
                </button>
                </Link>
              <button onClick={() => deleteProject(p._id)} className='bg-error flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center text-white text-base font-medium'>
                  Delete
              </button>
              <Link to={`update/${p._id}`}>
                <button className='bg-gray flex py-5 px-4 w-26 h-[12px] rounded-md items-center justify-center  text-white text-base font-medium'>
                    Update
                </button>
              </Link>
              </td>
            </tr>
          )
        }) }
    </tbody>
  </table>
</div>

  )
}

export default Table