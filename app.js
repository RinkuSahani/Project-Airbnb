const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


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
}


app.listen(8080,()=>{
    console.log("The port 8080 is listening.");
});

app.get("/",(req,res)=>{
    res.send("Hey! I am Home Page");
});

// app.get("/testListing",async (req,res)=>{
//     await sampleListings.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

// Index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// Create route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

// Show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// Create route
app.post("/listings",(req,res)=>{
    let {image,title,description,price,country,location}=req.body;
    let newListing=new Listing({
        image:image,
        title:title,
        description:description,
        price:price,
        country:country,
        location:location
    });
    newListing.save()
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/listings");
})

// Edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});
});

// Update route
app.put("/listings/:id/",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    res.redirect("/listings");
});

// Delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedData=await Listing.findByIdAndDelete(id);
    console.log(deletedData);
    res.redirect("/listings");
})