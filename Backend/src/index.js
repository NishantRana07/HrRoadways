import { app } from "./app.js";
import connectDB from "./db/db.js";
const PORT = process.env.PORT;


connectDB()
.then(() =>{
   app.on("error", (error) => {
      console.log("ERRR", error);
      throw error
   })

    app.listen(PORT, () => {
        console.log("Server is running at port : ", PORT)
    });
})
.catch((err) => {
    console.Console.log("MongoDB Connection failed !!!", err)
})