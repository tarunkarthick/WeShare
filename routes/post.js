const express=require('express')

const postController=require('../controllers/post')
const {requireSignin}=require('../controllers/auth')
const {userById}=require('../controllers/user')
const {createPostValidator}=require('../validator')

const router=express.Router()

router.get("/posts",postController.getPosts)

router.put("/post/like",requireSignin,postController.like)

router.put("/post/unlike",requireSignin,postController.unlike)

router.put("/post/comment",requireSignin,postController.comment)

router.put("/post/uncomment",requireSignin,postController.uncomment)



router.get("/posts/by/:userId",requireSignin,postController.postsByUser)

router.get("/post/:postId",postController.singlePost)

router.post("/post/new/:userId",requireSignin,postController.createPost,createPostValidator)

router.delete("/post/:postId",requireSignin,postController.isPoster,postController.deletePost)

router.put("/post/:postId",requireSignin,postController.isPoster,postController.updatePost)

router.get("/post/photo/:postId",postController.photo)



//any route containing :userId our app will first execute userById()

router.param("userId",userById)

//any route containing :postId our app will first execute postById()

router.param("postId",postController.postById)

module.exports=router
