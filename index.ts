import express from 'express';
import bodyParser from "body-parser";
import {router} from "./src/router/router";
import { AppDataSource } from './src/dataSource';
import cors from 'cors'
const app = express()

AppDataSource.initialize().then(()=>{
    console.log('Connect database success')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('', router)

app.listen(3001, () => {
    console.log('Server is running')
})