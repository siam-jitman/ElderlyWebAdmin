const uuidv4 = require('uuid/v4');

function generateUUID(){
    return uuidv4();
}

export default{
    generateUUID:generateUUID
}