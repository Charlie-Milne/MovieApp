import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

import dotenv from 'dotenv'

let environment_variabels = dotenv.config({ path: '.env' })

const MongoClient = mongodb.MongoClient
const mongo_username = environment_variabels.parsed.USERNAME
const mongo_password = environment_variabels.parsed.PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.v5ovlbj.mongodb.net/?appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS:2500
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(39)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`)
        })

    })
