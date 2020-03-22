const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('invalid submission');
  }
  db.select('email', 'hash')
    .from('login')
    .where({ email })
    .then(data => {
      let isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where({ email })
          .then(user => res.json(user[0]))
          .catch(() => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('error signing in');
      }
    })
    .catch(() => res.json('error signing in'));
};

module.exports = {
  handleSignin,
};
