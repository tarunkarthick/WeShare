const express=require('express')

const postController=require('../controllers/post')
const {requireSignin}=require('../controllers/auth')
const {userById}=require('../controllers/user')
const {createPostValidator}=require('../validator')

const router=express.Router()

router.get("/api/posts",postController.getPosts)

router.put("/api/post/like",requireSignin,postController.like)

router.put("/api/post/unlike",requireSignin,postController.unlike)

router.put("/api/post/comment",requireSignin,postController.comment)

router.put("/api/post/uncomment",requireSignin,postController.uncomment)



router.get("/api/posts/by/:userId",requireSignin,postController.postsByUser)

router.get("/api/post/:postId",postController.singlePost)

router.post("/api/post/new/:userId",requireSignin,postController.createPost,createPostValidator)

router.delete("/api/post/:postId",requireSignin,postController.isPoster,postController.deletePost)

router.put("/api/post/:postId",requireSignin,postController.isPoster,postController.updatePost)

router.get("/api/post/photo/:postId",postController.photo)



//any route containing :userId our app will first execute userById()

router.param("userId",userById)

//any route containing :postId our app will first execute postById()

router.param("postId",postController.postById)

module.exports=router
