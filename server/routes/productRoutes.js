const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getAllReviews,
    deleteReview
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.get('/reviews/all', protect, admin, getAllReviews);
router.delete('/reviews/:productId/:reviewId', protect, admin, deleteReview);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
