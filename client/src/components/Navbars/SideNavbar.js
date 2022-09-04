import style from '../../moduleCSS/SideNavbar.module.css'
import Logo from '../../images/Blogger_logo.png'
import { MdDashboardCustomize } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { ImBook } from 'react-icons/im'
import { Link } from 'react-router-dom'

export default function SideNavbar() {
    return (
        <div className={style.SideNavbar}>
            <nav>
                <ul className={style.TopnavbarList}>
                    <li>
                        <img className={style.logo} src={Logo} alt="" />
                    </li>
                </ul>
            </nav>
            <div className={style.MainMenu}>
                <ul style={{ marginBottom: "0", listStyle: "none"}}>
                    <li>
                        <h6>Main Menu</h6>
                    </li>
                </ul>
                <ul className={style.MenuList}>
                    <Link to="/admin">
                        <li >
                            <MdDashboardCustomize />
                            <span>Dashboard</span>
                            {/* <span style={{marginLeft: "auto"}}><IoIosArrowDown/></span> */}
                        </li>
                    </Link>
                    <Link to="/admin">
                        <li>
                            <ImBook />
                            <span>Blogs</span>
                            <span style={{ marginLeft: "auto" }}><IoIosArrowDown /></span>
                        </li>
                    </Link>
                    <ul className={style.subMainMenu}>
                        <Link to="/blogs/list"><li>Blogs List</li></Link>
                        <Link to="/blogs/create"><li>Create Blog</li></Link>
                    </ul>
                                        
                </ul>
            </div>
        </div>
    )
}