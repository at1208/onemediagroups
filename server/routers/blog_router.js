const express = require('express');
const router = express.Router();
const { create,
        filter_blog,
        my_blogs,
        single_blog,
        blog_list_by_category,
        read_blog,
        blog_list_by_domain,
        blog_list_for_sitemap,
        latest_authors_list_by_domain,
        blog_review_update,
        related_blogs_by_domain,
        trending_blogs_by_domain } = require('../controllers/blog_controller');

const { check_permission } = require("../utils/permission");

// validators
const { run_validation } = require('../validators');
const { blogCreateValidator } = require('../validators/blog_validator');
const { requireSignin, authMiddleware } = require('../controllers/employee_controller');


router.post('/blog/:moduleType/:permission',
             requireSignin,
             authMiddleware,
             check_permission,
             blogCreateValidator,
             run_validation,
             create );

router.patch('/blog/review/update/:blogId/:moduleType/:permission',
             requireSignin,
             authMiddleware,
             check_permission,
             blog_review_update);

router.post('/blog/filter/:moduleType/:permission',
             requireSignin,
             authMiddleware,
             check_permission,
             filter_blog);

router.get('/blog/single/:id/:moduleType/:permission',
             requireSignin,
             authMiddleware,
             check_permission,
             single_blog);

 router.get('/blog/my-blogs/:moduleType/:permission',
              requireSignin,
              authMiddleware,
              check_permission,
              my_blogs);

//End User Application
router.post("/blog/list/:domainId", blog_list_by_domain);
router.post("/blog/list/category/:domainId", blog_list_by_category);
router.get("/blog/list/sitemap/:domainId", blog_list_for_sitemap);
router.get("/author/list/:domainId", latest_authors_list_by_domain);
router.get("/blog/trending/list/:domainId", trending_blogs_by_domain);
router.post("/blog/related/list/:domainId", related_blogs_by_domain);
router.get("/blog/:slug", read_blog);

module.exports = router;
