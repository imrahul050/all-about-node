const express = require('express');

const router = express.Router();

const blogController = require('../author/blog.controller');

const authMiddleware =
    require('../../../middleware/auth.middleware');

const roleMiddleware =
    require('../../../middleware/role.middleware');

const validate =
    require('../../../middleware/validation.middleware');

const upload =
    require('../../../utils/upload');

const ROLES =
    require('../../../constants/roles');

const {
    createBlogSchema,
    updateBlogSchema,
} = require('../validations/blog.validation');



router.post('/blogs', authMiddleware, roleMiddleware(ROLES.AUTHOR), upload.single('image'), validate(createBlogSchema), blogController.createBlog);
router.get('/blogs', authMiddleware, roleMiddleware(ROLES.AUTHOR), blogController.myBlogs);

router.get(
    '/blogs/:id',

    authMiddleware,

    roleMiddleware(
        ROLES.AUTHOR
    ),

    blogController.show
);


router.put(
    '/blogs/:id',

    authMiddleware,

    roleMiddleware(
        ROLES.AUTHOR
    ),

    upload.single('image'),

    validate(updateBlogSchema),

    blogController.update
);
router.delete(
    '/blogs/:id',

    authMiddleware,

    roleMiddleware(
        ROLES.AUTHOR
    ),

    blogController.destroy
);



module.exports = router;