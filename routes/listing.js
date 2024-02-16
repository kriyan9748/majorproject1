const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,isReviewAuthor}=require("../middleware.js");

const listingController=require("../controllers/listings.js");

// Store setup for Cloudinary
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage });

  // Index Route
  router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));



  
    // New listing create route
    
    router.get("/new",isLoggedIn,listingController.renderNewForm);
    

  router.route("/:id")
  .get(wrapAsync (listingController.showListing))
  .put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,isReviewAuthor,wrapAsync(listingController.destroyListing));


  // Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


console.log(process.env.CLOUD_NAME);

    module.exports=router;