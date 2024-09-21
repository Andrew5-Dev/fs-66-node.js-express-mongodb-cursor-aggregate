import {Router} from 'express'
/*import {
    getUsersHandler,
    postUsersHandler,
    getUserByIdHandler,
    putUserByIdHandler,
    deleteUserByIdHandler,

} from '../controllers/users.mjs'*/
import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getUserById,
    createUsers,
    getUsers,
    getUsersByAge,
    deleteUsers,
    updateUsers,
    getUsersByUsername
} from '../controllers/userControllers.mjs'

import {validateParamsUserId, validateUserPost, validateUserPut} from '../validators/userValidator.mjs'
import validateUserInput from '../middlewares/validateUserInput.mjs'


const usersRouter = Router()

usersRouter
    .post('/', createUser)
    .post('/', createUsers)
    .get('/', getUser)
    .get('/', getUsers)
    .get('/', getUsersByAge)
    .get('/:username', getUsersByUsername)
    .get('/:id', getUserById)
    .delete('/:id', deleteUser)
    .delete('/', deleteUsers)
    .put('/:id', updateUser)
    .put('/:id', updateUsers)


/*usersRouter.route('/')
  .get(getUsersHandler)
  .post(validateUserInput, validateUserPost,  postUsersHandler)

usersRouter
    .route('/:userId')
    .get(validateParamsUserId, getUserByIdHandler)
    .put(validateUserInput, validateParamsUserId, validateUserPut, putUserByIdHandler)
    .delete(validateParamsUserId, deleteUserByIdHandler)*/

export default usersRouter