import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/users';
import { authenticate } from '../config/passport';


const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);



export default router;