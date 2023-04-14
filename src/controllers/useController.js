import userService from '../services/userService';

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing inputs parameter',
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
const handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: 'Missing required parameter',
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: 'Ok',
    users,
  });
};
const handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  // console.log('message', message);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.EditUser(data);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(403).json({
      errCode: 1,
      errMessage: 'Missing required parameter',
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

const getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    // console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.log('Get all code error', e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server',
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
