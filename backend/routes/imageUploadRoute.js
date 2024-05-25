
const upload = require('../middlewares/multerStorage')
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageCOntroller')
const postsController = require('../controllers/postsController')

router.post('/post/upload-post', upload.single('file'), imageController.postingImage)
router.route('/image/get-image/:id').get(imageController.singleImage)
router.get('/post/get-posts', postsController.getPosts)

module.exports = router;

  