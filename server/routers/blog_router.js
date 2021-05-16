const express = require('express');
const router = express.Router();
const { create,
        filter_blog,
        single_blog,
        read_blog,
        blog_list_by_domain,
        latest_authors_list_by_domain,
        blog_review_update,
        related_blogs_by_domain,
        trending_blogs_by_domain } = require('../controllers/blog_controller');

// validators
const { run_validation } = require('../validators');
const { blogCreateValidator } = require('../validators/blog_validator');
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');


router.post('/blog',  requireSignin, authMiddleware, blogCreateValidator, run_validation, create);
router.patch('/blog/review/update/:blogId',  requireSignin, authMiddleware, blog_review_update);
router.post('/blog/filter', requireSignin, authMiddleware, filter_blog);
router.get('/blog/single/:id', requireSignin, authMiddleware, single_blog);
router.get("/blog/:slug", read_blog);
router.post("/blog/list/:domainId", blog_list_by_domain);
router.get("/author/list/:domainId", latest_authors_list_by_domain);
router.get("/blog/trending/list/:domainId", trending_blogs_by_domain);
router.post("/blog/related/list/:domainId", related_blogs_by_domain);
module.exports = router;
