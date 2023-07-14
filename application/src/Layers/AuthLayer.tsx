import React , { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import CircularProgress from '@mui/icons-material/LinearScale';
import LoadingLogo from '../assets/logoLoading.svg';

const AuthLayer = ({children} : {children: any}) => {
  const { user , isAuthenticated , isLoading , loginWithRedirect } = useAuth0();
  const [isAuthLoading , setIsAuthLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthLoading(true);

    console.log("LOADING" , isLoading);
    console.log("AUTHED" , isAuthenticated);
    console.log(user);
    
    if(isLoading) return

    if(!isAuthenticated && !isLoading) {
        loginWithRedirect();
    }
    else if (!isLoading && isAuthenticated) {
        setIsAuthLoading(false);
    }

  } , [isLoading , isAuthenticated])
  return (  
    isAuthLoading ? (
    <div style={{backgroundColor: 'white'  , display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src={LoadingLogo} alt="Logo loading" />
    </div>) 

    : <div> {children} </div> 
  )
}

export default AuthLayer;