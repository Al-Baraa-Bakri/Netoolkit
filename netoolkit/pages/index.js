import SideBar from "../Components/SideBar";
import styles from '../styles/index.module.scss'; 
import App from "../Components/App";
const Dahsboard = () => {
  return (
    <main className={styles.main}>
      <SideBar />
      <App />
    </main>
  )
}

export default Dahsboard;