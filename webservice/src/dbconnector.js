const mariadb = require('mariadb');

const config ={
	host: "127.0.0.1",
	user: "testwebserveruser",
	password: "testwebserverpass",
	database: "webserverdb",
	connectionLimit: 5,
	acquireTimeout: 300
};

class DBConnector{
	dbconnector = mariadb.createPool(config);

	async query(sQuery){
		var conn = await this.dbconnector.getConnection();
		var ret = null;
		await conn.query(sQuery)
			.then(data =>{
				ret = data;
				console.log(data);
				conn.end();
			})
		        .catch(err =>{
				console.log(err);
				conn.end();
			})
		return ret;
	}
	
	async queryWithParams(sQuery,params){
		var conn = await this.dbconnector.getConnection();
		var ret = null;
		await conn.query(sQuery, params)
			.then(data =>{
				ret = data;
				console.log(data);
				conn.end();
			})
		        .catch(err =>{
				console.log(err);
				conn.end();
			})
		return ret;
	}
}

module.exports = new DBConnector();


