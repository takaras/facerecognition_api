const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
        return;
      }
      res.status(404).json('User not found');
    })
    .catch(() => res.status(400).json('error getting user'));
};

module.exports = {
  handleProfileGet,
};
