const { getUserByUsername } = require('../../models');
const { setTokenToCookie } = require('../../util');
const bcryptjs = require('bcryptjs');

const renderLoginPage = (req, res) => {
  const { username, message } = req.query;
  const { user } = req;

  if (user) {
    res.redirect('/index');
  } else {
    res.render('login', { username, message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  let isAuthenticated = false;
  let errorMessage = 'No such user or incorrect password!';

  try {
    const user = await getUserByUsername(username);

    if (bcryptjs.compareSync(password, user.password)) {
      setTokenToCookie(res, { userId: user.id });
      isAuthenticated = true;
    }
  } catch (error) {
    console.log(error.message);
    errorMessage = 'Database failure!';
  }

  if (isAuthenticated) {
    res.redirect('/index');
  } else {
    res.redirect(`/login?message=${encodeURIComponent(errorMessage)}&username=${encodeURIComponent(username)}`);
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt_token');
  res.redirect(`/login?message=${encodeURIComponent("You've been logged out!")}`);
};

module.exports = {
  renderLoginPage,
  userLogin,
  logout,
};