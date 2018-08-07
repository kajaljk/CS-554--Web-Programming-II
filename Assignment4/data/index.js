const jsonFileObject = require("jsonfile");
const dataFile = "./data/dummyData.json";

const redis = require("redis");

const client = redis.createClient();

const userData = jsonFileObject.readFileSync(dataFile);

let history = [];

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            if (isNaN(id)) {
                reject(new Error ("Id should be in number."));
            }
            if (await client.existsAsync(id.toString())) {
                let data = await client.getAsync(id.toString());
                history.unshift(JSON.parse(data));
                resolve(JSON.parse(data));
            }
            else {
                let result = userData.filter(function (data) {
                    return data.id == id;
                });
                if (result.length > 0) {
                    history.unshift(result[0]);
                    let putData = await client.setAsync(result[0].id.toString(), JSON.stringify(result[0]));
                    resolve (result[0]);
                }
                else {
                    reject (new Error(`No data found with given id : ${id}`));
                }            
            }
        }, 5000);
    });
};

module.exports = {
    getById: getById,
    history : history
}