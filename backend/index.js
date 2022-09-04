//returns a function reference. that function is called with express() . app is an object returned by express()
const express = require("express")
//instantiates Express and assigns app variable to it
const app = express()
//cors for Cross Origin Resource Sharing used for tranferring data between browsers and servers
const cors = require('cors')
app.use(cors())
// body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//database connection
const dbconn = require('./databaseConn')
// dynamic collections names
const blogsCollectionName = "blogs"
const adminsCollectionName = "admins"

//test 
app.get('/', (req, res) => {
    res.send('This is backend for Blogger')
})

//search 
app.post('/searchBlog', async(req, res)=>{
    const results = await SearchBlogByName(blogsCollectionName, req.body.name)
    res.send(results)
})

// check if username and password is correct
app.post('/admins', async (req, res) => {
    const db = await dbconn(adminsCollectionName)
    const data = await db.find({ username: req.body.username, password: req.body.password }).toArray()
    const fres = data.length
    if (fres === 1) { res.send(true) } else res.send(false)
})

//dashboard data
app.post('/dashboardData', async (req, res) => {
    //connection with data>collection
    const blogs = await dbconn(blogsCollectionName)
    const admins = await dbconn(adminsCollectionName)
    //executing mongodb queries
    const latestBlogs = await blogs.find().sort({ $natural: -1 }).limit(6).toArray()
    const blogsCount = await blogs.countDocuments()
    const techBlogsCount = await blogs.countDocuments({ category : "Technology"})
    const entertainmentBlogsCount =  await blogs.countDocuments({ category : "Entertainment"})
    const communityBlogsCount =  await blogs.countDocuments({ category : "Community"})
    //getting admin name
    const datau = await admins.findOne({ username: req.body.username })
    const adminFullName = datau.fullName
    //saving all data in a constant
    const dashboardData = { latestBlogs: latestBlogs, blogsCount: blogsCount, techBlogsCount: techBlogsCount, entertainmentBlogsCount: entertainmentBlogsCount, communityBlogsCount: communityBlogsCount, adminName: adminFullName }
    //sending all fetched data to client-side
    res.send(dashboardData)
})

app.post('/createNewBlog', async(req, res)=>{
    const response = await InsertData(blogsCollectionName, req.body.blogD)
    res.send(response.acknowledged)
})

app.post('/blogs', async(req, res) => {
    const data = (req.body.category) ? await GetDataCategory(blogsCollectionName, req.body.category) : await GetData(blogsCollectionName)
    res.send(data)
})

const GetData = async (collectionName) => {
    const db = await dbconn(collectionName)
    const data = await db.find().toArray()
    return data
}
const GetDataCategory = async (collectionName, query) => {
    const db = await dbconn(collectionName)
    const data = await db.find({category: query}).toArray()
    return data
}

const InsertData = async (collectionName, Data) => {
    const db = await dbconn(collectionName)
    const quantity = await db.countDocuments()
    const id = 1+quantity
    Data.id = id.toString()
    const response = await db.insertOne(Data)
    return response
}

const SearchBlogByName = async(collectionName, searchQuery) => {
    const blogs = await dbconn(collectionName)
    const result = await blogs.find({ "title" : {$regex : `${searchQuery}`   , $options: "si"  }}).toArray()
    return result
}

app.listen(8000)