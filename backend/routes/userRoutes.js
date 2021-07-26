import express from 'express';
const router = express.Router();
import {
  authUser,
  getUsers,
  getUserById,
  updateUser,
  registerUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);
router.route('/login').post(authUser);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);




export default router;
