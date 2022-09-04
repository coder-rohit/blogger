import { Table, Button } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/CreateBlog.module.css'

export default function CreateBlog() {

    const [blog, setblog] = useState({
        title: "", author: "", category: "", matter: ""
    })

    const handleInputs = (e) => {
        // e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setblog({ ...blog, [name]: value })
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/createNewBlog', {
            blogD: blog
        })
            .then(function (res) {
                if(res.data===true) {alert("Blog Created successfully")} else alert("Unable to post your blog")
            })
            .catch(function (error) {
                console.log(error)
            })
            e.target.reset()
    }

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={10}>
                    <Navbar page="Student" />
                    <div className="mainContentContainer">
                        <h2>You came up with something new?</h2>
                        <h6 style={{ color: "grey" }}>Add New blog</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                            </div>
                        </div>
                        <form className={style.blogForm} onSubmit={handleFormData}>
                            <Table className={style.formTable}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="title">Title</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="title" value={blog.name} placeholder="Enter Title" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="author">Author</label>
                                        </td>
                                        <td>
                                            <input type="text" onChange={handleInputs} name="author" value={blog.author} placeholder="Enter Author Name" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="cost">Category</label>
                                        </td>
                                        <td>
                                            <select style={{padding: "5px 5px"}} name="category" onChange={handleInputs}>
                                                <option value={null}>Select Category</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Community">Community</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="quantity">Matter</label>
                                        </td>
                                        <td>
                                            <textarea style={{height: "125px"}} type="number" onChange={handleInputs} name="matter" value={blog.quantity} placeholder="Matter to be displayed" >
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            <Button style={{backgroundColor: "#18AEFA ", border: "none"}} type="submit">Create Blog</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </form>
                    </div>
                </Col>
            </Row>
        </>
    )
}