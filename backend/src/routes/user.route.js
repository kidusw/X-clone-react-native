import express from "express";
import { getUserProfile,syncUser,updateProfile ,getCurrentUser,followUser} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//public route
router.get('/profile/:username',getUserProfile);

//private route
router.post('/sync',protectRoute,syncUser);
router.get('/me',protectRoute,getCurrentUser);
router.put('/profile',protectRoute,updateProfile);
router.post('/follow/:targetUserId',protectRoute,followUser);


export default router;