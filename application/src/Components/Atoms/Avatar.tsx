import React , {useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
const Avatar = () => {
    const { user , getAccessTokenSilently } = useAuth0();
    const [isDrowpdownOpen , setIsDrowpdownOpen] = useState(false);

    const toggleDrowpdown = async () => {
        setIsDrowpdownOpen((prev) => !prev);
        const token = await getAccessTokenSilently() ;
        console.log(token);
        
    }
  return (
    <div className='relative'>
  <img
    id="avatarButton"
    data-dropdown-toggle="userDropdown"
    data-dropdown-placement="bottom-start"
    className="w-10 h-10 rounded-full cursor-pointer"
    src={user?.picture}
    alt="User dropdown"
    onClick={() => toggleDrowpdown()}
  />
  {/* Dropdown menu */}
  <div
    id="userDropdown"
    className={`absolute -left-[400%] z-10 ${isDrowpdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44`}
  >
    <div className="px-4 py-3 text-sm text-gray-dark">
      <div className='font-bold text-gray-dark'>{user?.nickname}</div>
      <div className="font-bold text-gray-dark truncate">{user?.email}</div>
    </div>
    <ul
      className="text-sm text-gray-dark"
      aria-labelledby="avatarButton"
    >
      <li>
        <a
          href="#"
          className="block px-4 py-[12px] hover:bg-gray-light"
        >
          Settings
        </a>
      </li>
    </ul>
    <div className="py-1 text-gray-light hover:bg-gray-light">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-dark"
      >
        Sign out
      </a>
    </div>
  </div>
</div>

  )
}

export default Avatar