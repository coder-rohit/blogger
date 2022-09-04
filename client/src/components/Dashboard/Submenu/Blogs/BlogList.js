import { Table } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import style from "../../../../moduleCSS/BlogList.module.css"
export default function BlogList() {

    const [blog, setBlog] = useState([])
    const [category, setCategory] = useState(undefined)

    useEffect(() => {

        axios.post('http://localhost:8000/blogs',{
            category : category
    })
            .then(function (response) {
                setBlog(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [category])

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={10}>
                    <Navbar page="blog" />
                    
                    <Row>
                        
                        <Col xl={9}>

                            <div className="mainContentContainer" style={{padding: "0 3%"}}>
                            <h2>Blogs</h2>
                        <h6 style={{ color: "grey" }}>List of the blogs</h6>
                                <Table hover className={style.BlogTable}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            blog.map((blog) => {
                                                return (
                                                    <tr key={blog.id}>
                                                        <td>{blog.id}</td>
                                                        <td>
                                                            <Link to={"/"}>
                                                                {blog.title}
                                                            </Link>
                                                        </td>
                                                        <td>{blog.author}</td>
                                                        <td>{blog.category}</td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col>
                            <div className={style.categoriesMainDiv}>
                                <h4>Catagories</h4>
                                <div className={style.categories}>
                                    <ul>
                                        <li onClick={()=>setCategory("Technology")}>Technology Blogs</li>
                                        <li onClick={()=>setCategory("Entertainment")}>Entertainment Blogs</li>
                                        <li onClick={()=>setCategory("Community")}>Community Blogs</li>
                                        <li onClick={()=>setCategory(undefined)}>See all</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}