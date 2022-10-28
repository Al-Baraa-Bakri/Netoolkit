import styles from '../../styles/index.module.scss'
const Item = ({title , Icon , isActive , setActiveApp}) => {
  return (
        <li className={ ` ${!isActive ? styles.nav__list__item : styles.nav__list__itemActive} `  } onClick = { () => setActiveApp(title) } >
          <Icon />
          <h1 className={styles.nav__list__item__title}> {title} </h1>
        </li>
  )
}

export default Item;