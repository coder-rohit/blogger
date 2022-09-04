import Navbar from '../Navbars/Navbar'
import { Row, Col, Table } from 'react-bootstrap'
import style from "../../moduleCSS/Admin.module.css"
import { FaUserGraduate, FaCoins } from "react-icons/fa"
import { IconContext } from 'react-icons/lib/esm/iconContext'
import { ImBooks } from 'react-icons/im'
import { SiBookstack } from 'react-icons/si'
import SideNavbar from '../Navbars/SideNavbar' 
import { useEffect, useState } from 'react'
//cookies
import { useCookies } from 'react-cookie'
// axios
const axios = require('axios').default;

export default function Dashboard() {

    const [cookies] = useCookies(['username']);
    const [apiData, setapiData] = useState([])    

    useEffect(() => {
        (cookies.username !== "undefined") && getData()
        async function getData() {
            await axios.post('http://localhost:8000/dashboardData', {
                username: cookies.username
            })
            .then(function (response) {
                setapiData(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            })
        }
    }, [cookies])
    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={10}>
                    <Navbar page="Blog"/>
                    <div className="mainContentContainer">
                        <h2>Welcome, {apiData.adminName} </h2>
                        <h6 style={{ color: "grey" }}>Dashboard</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <ImBooks />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.blogsCount}</h2>
                                        <h6>Total Blogs</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#19AFFB" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <FaUserGraduate />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.techBlogsCount}</h2>
                                        <h6>Tech Blogs</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#F46841" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <SiBookstack />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.entertainmentBlogsCount}</h2>
                                        <h6>Entertainment</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#6E6BFA" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <FaCoins />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.communityBlogsCount}</h2>
                                        <h6>Community</h6>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Row>
                            
                            <Col className={style.quickViewTablesCol}>
                                <div className={style.quickViewTables}>
                                    <div className={style.quickViewTablesHeader}>
                                        <h5>Latest Blogs</h5>
                                    </div>
                                    <div className={style.quickViewTableDiv}>
                                        <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Author</th>
                                                    <th>Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    apiData.latestBlogs && apiData.latestBlogs.map((blogs, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{blogs.id}</td>
                                                                <td>{blogs.title}</td>
                                                                <td>{blogs.author}</td>
                                                                <td>{blogs.category}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}