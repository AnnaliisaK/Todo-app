const { persistUser } = require('../../models');
const { setTokenToCookie } = require('../../util');

const renderRegistrationPage = (req, res) => {
  const { firstname, lastname, email, username, error } = req.query;
  const { user } = req;

  if (user) {
    res.redirect('/dashboard');
  } else {
    res.render('register', { firstname, lastname, email, username, error });
  }
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  try {
    const userId = await persistUser(username, password, email, firstname, lastname);
    setTokenToCookie(res, { userId });
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e.message);
    const error =
      e.code === 'SQLITE_CONSTRAINT' ? 'Given e-mail address and/or username is already taken!' : 'Server error!';

    res.render('register', {
      firstname,
      lastname,
      username,
      error,
    });
  }
};

module.exports = {
  renderRegistrationPage,
  registerUser,
};