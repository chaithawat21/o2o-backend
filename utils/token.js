module.exports = (id, firstname) => {
  const payload = { id: id, firstname: firstname };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token
};
// for testing and failed
