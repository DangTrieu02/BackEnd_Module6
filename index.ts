import express from 'express';
import bodyParser from "body-parser";
import router from './src/routers/index';
import { AppDataSource } from './src/dataSource';
const app = express()

AppDataSource.initialize().then(()=>{
    console.log('Connect database success')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router)

app.listen(3001, () => {
    console.log('Server is running')
})