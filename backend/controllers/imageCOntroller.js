const Image = require("../models/Posts");
const path = require("path"); //for single specific Image
const fs = require('fs'); //for single specific Image

const postingImage = async (req, res) => {
    try {
      // Create an Image model instance.
      const image = new Image({
        file_name: req.file.originalname,
        content_type: req.file.mimetype,
        image_id: req.file.id,
        description : req.body.description,
        price: req.body.price,
        type: req.body.type,

      });
  
      // Save the Image model instance to the database.
      const savedImage = await image.save();
  
      // Set the imageUrl based on your server URL and the image ID
      savedImage.imageUrl = `http://localhost:6001/image/get-image/${savedImage._id}`;
      //this is for getting the image from the database
  
      // Save the updated Image model
      await savedImage.save();
  
      res.status(200).json({status : "success", data: savedImage});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  }

  const singleImage = async (req, res) => {
    try {
      const image = await Image.findById(req.params.id); //req -> local:Url 
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Construct the path to the image file in the uploads folder based on _id
      // const imagePath = path.join(__dirname, 'uploads', `${req.user._id}-${image.name}`); //"will use when add authentication"
      // const imagePath = path.join(__dirname, 'uploads', `${image.name}`);  //this is disgusting `${}`

      const imagePath = path.join(__dirname, '..', 'images', image.file_name);
  
      // Check if the file exists
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: 'Image file not found' });
      }
  
      // Send the image file as a response
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve image' });
    }
  }
  
  

  module.exports = { 
    postingImage,
    singleImage
  };