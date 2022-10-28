import Item from './Item';
import Logo from './Logo';
import styles from '../../styles/index.module.scss';
import HomeIcon from '../../svgs/Icons/Home.svg';
import ToolkitIcon from '../../svgs/Icons/Toolkit.svg';
import ProjectsIcon from '../../svgs/Icons/Projects.svg';
import FeedbacksIcon from '../../svgs/Icons/Feedbacks.svg';

import HomeIconActive from '../../svgs/Icons/HomeActive.svg';
import ToolkitIconActive from '../../svgs/Icons/ToolkitActive.svg';
import ProjectsIconActive from '../../svgs/Icons/ProjectsActive.svg';
import FeedbacksIconActive from '../../svgs/Icons/FeedbacksActive.svg';
import { useState } from 'react';
const SideBar = () => {
  const [activeApp, setActiveApp] = useState('Home');

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.nav__list}>
        <Item
          title={'Home'}
          Icon={activeApp !== 'Home' ? HomeIcon : HomeIconActive}
          isActive={activeApp === 'Home' ? true : false}
          setActiveApp={setActiveApp}
        />
        <Item
          title={'My Projects'}
          Icon={activeApp !== 'My Projects' ? ProjectsIcon : ProjectsIconActive}
          isActive={activeApp === 'My Projects' ? true : false}
          setActiveApp={setActiveApp}
        />
        <Item
          title={'Toolkit'}
          Icon={activeApp !== 'Toolkit' ? ToolkitIcon : ToolkitIconActive}
          isActive={activeApp === 'Toolkit' ? true : false}
          setActiveApp={setActiveApp}
        />
        <Item
          title={'Feedbacks'}
          Icon={activeApp !== 'Feedbacks' ? FeedbacksIcon : FeedbacksIconActive}
          isActive={activeApp === 'Feedbacks' ? true : false}
          setActiveApp={setActiveApp}
        />
      </ul>
    </nav>
  );
};

export default SideBar;
