const express=require('express')

const {signup,signin,signout,forgotPassword,resetPassword,socialLogin}=require('../controllers/auth')
const {userById}=require('../controllers/user')
const {userSignupValidator,passwordResetValidator}=require('../validator')

const router=express.Router()


router.post("/api/signup",userSignupValidator,signup)
router.post("/api/signin",signin)
//signout
router.get("/api/signout",signout)

router.put("/api/forgot-password", forgotPassword);
router.put("/api/reset-password", passwordResetValidator, resetPassword);

router.post("/api/social-login", socialLogin); 


//any route containing :userId our app will first execute userById()

router.param("userId",userById)

module.exports=router
