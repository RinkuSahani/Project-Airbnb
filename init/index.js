const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

let MONGO_URL="mongodb://127.0.0.1:27017/wonderLust";
main()
.then((res)=>{
    console.log("Mongoose is connected.");
})
.catch((err)=>{
    console.log(err);
    console.log("Mongoose is not connected.");
});

async function main(){
    await mongoose.connect(MONGO_URL); 
};

const initDB=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}
initDB();