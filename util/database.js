// import { Sequelize } from "sequelize";
// const sequelize = new Sequelize("node_complete", "root", "Admin@123", {
//   dialect: "mysql",
//   host: "localhost",
// });

// export default sequelize;

/// mongodb connection

import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"; // Local MongoDB URL
const dbName = "nodejscomplete"; // Replace with your database name

async function connectToMongo() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    return client.db(dbName);
    // Perform your database operations here
  } catch (error) {
    console.error("Connection failed", error);
  } finally {
    await client.close(); // Ensure the client is closed after operations
  }
}

export default await connectToMongo();
