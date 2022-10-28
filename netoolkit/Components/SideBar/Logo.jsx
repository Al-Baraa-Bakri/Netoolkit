import React from 'react'
import styles from '../../styles/index.module.scss'
import WebsiteLogo from '../../svgs/Logo.svg'

const Logo = () => {
  return (
    <WebsiteLogo className={styles.nav__logo}></WebsiteLogo>
  )
}

export default Logo