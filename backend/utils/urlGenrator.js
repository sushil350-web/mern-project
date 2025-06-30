import DataUrlParser from 'datauri/parser.js';


import path from 'path';

const getDataUrl=(file)=>{
    const parser= new DataUrlParser();
    const extName=path.extname(file.originalname)
    return parser.format(extName, file.buffer);
};

export default getDataUrl;