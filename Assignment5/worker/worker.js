const redisConnection = require("../redis-connection");
const request = require('request-promise');


const dataUrl= "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json";

let mainWorker = async () =>{ 

let peopleData = await request(dataUrl, true);
peopleData = JSON.parse(peopleData);


redisConnection.on('get-people-by-id:request:*', (message, channel) => {  
    let requestId = message.requestId;
    let eventName = message.eventName;
    let id = message.data.id;
    let successEvent = `${eventName}:success:${requestId}`;
    let failEvent = `${eventName}:failed:${requestId}`;

    const user= peopleData.filter(x=> x.id === parseInt(id));

    if (user[0]) {
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: user[0],
            eventName: eventName
        });
    }
    else {
        redisConnection.emit(failEvent, {
            requestId: requestId,
            data: `User with id ${id} doesn't exist.`,
            eventName: eventName
        });
    }
});

redisConnection.on('post-people:request:*', (message, channel) => { 
    let requestId = message.requestId;
    let eventName = message.eventName;
    let successEvent = `${eventName}:success:${requestId}`;
    let failEvent = `${eventName}:failed:${requestId}`;

    let newUser = message.data.messageBody;

    let errorMsg='';
    if (typeof newUser.first_name !== 'string' || newUser.first_name === undefined || newUser.first_name === null) {
        errorMsg = 'First name is required field and should be string';
    }
    if (typeof newUser.last_name !== 'string' || newUser.last_name === undefined || newUser.last_name === null) {   
        errorMsg = 'Last name is required field and should be string';
    }
    if (typeof newUser.email !== 'string' || newUser.email === undefined || newUser.email === null) {
        errorMsg = 'Email is required field and should be string';
    }
    if (typeof newUser.gender !== 'string' || newUser.gender === undefined || newUser.gender === null) {
        errorMsg = 'Gender is required field and should be string';
    }
    if (typeof newUser.ip_address !== 'string' || newUser.ip_address === undefined || newUser.ip_address === null) {
        errorMsg = 'Ip address is required field and should be string';
    }

    if(errorMsg == ''){
        newUser.id = peopleData[peopleData.length - 1] ? peopleData[peopleData.length - 1].id + 1 : 1;
        peopleData.push(newUser);

        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: newUser,
            eventName: eventName
        });
    }
    else{
        redisConnection.emit(failEvent, {
            requestId: requestId,
            data: errorMsg,
            eventName: eventName
        });
    }
});

redisConnection.on('delete-people-by-id:request:*', (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    let {id} = message.data;
    let successEvent = `${eventName}:success:${requestId}`;
    let failEvent = `${eventName}:failed:${requestId}`;

    let user= peopleData.filter(x=> x.id === parseInt(id));
    if (user[0]) {
        for(var i=0;i<peopleData.length;i++){
            if(peopleData[i].id==id){
                peopleData.splice(i,1);
            }
        }
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: `User with id ${id} is deleted.`,
            eventName: eventName
        });
    }
    else {
        redisConnection.emit(failEvent, {
            requestId: requestId,
            data: `User with id ${id} doesn't exist.`,
            eventName: eventName
        });
    }
});

redisConnection.on('put-people:request:*', (message, channel) => { 
    let requestId = message.requestId;
    let eventName = message.eventName;
    
    let {id, messageBody} = message.data;
    let newUser= messageBody;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let errorMsg='';
    if (typeof newUser.first_name !== 'string' || newUser.first_name === undefined || newUser.first_name === null) {
        errorMsg = 'First name is required field and should be string';
    }
    if (typeof newUser.last_name !== 'string' || newUser.last_name === undefined || newUser.last_name === null) {   
        errorMsg = 'Last name is required field and should be string';
    }
    if (typeof newUser.email !== 'string' || newUser.email === undefined || newUser.email === null) {
        errorMsg = 'Email is required field and should be string';
    }
    if (typeof newUser.gender !== 'string' || newUser.gender === undefined || newUser.gender === null) {
        errorMsg = 'Gender is required field and should be string';
    }
    if (typeof newUser.ip_address !== 'string' || newUser.ip_address === undefined || newUser.ip_address === null) {
        errorMsg = 'Ip address is required field and should be string';
    }

    let userExist = false;
    for (let i = 0; i < peopleData.length; i++) {
        if (peopleData[i]['id'] == parseInt(id)) {
            peopleData.splice(i, 1, newUser);
            userExist = true;
            break;
        }
    }

    if(userExist && errorMsg == ''){
        redisConnection.emit(successEvent, {
            requestId:requestId,
            data: newUser,
            eventName:eventName
        });
    } else {
        if(!userExist){
            redisConnection.emit(failedEvent, {
                requestId:requestId,
                data: `User with id ${id} doesn't exist.`,
                eventName:eventName
            });
        }else{
            redisConnection.emit(failedEvent, {
                requestId:requestId,
                data: errorMsg,
                eventName:eventName
            });
        }
    }
});
}
mainWorker().catch(error => console.error(error));