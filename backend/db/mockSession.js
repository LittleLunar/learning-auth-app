const users = [
  {
    email: "lunar.inthemoonllight@gmail.com",
    username: "littlelunar",
    password: "Neptuniavii0",
  },
];

const sessions = {};

const getSession = sessionId => {
  const session = sessions[sessionId];

  return session && session.valid ? session : null;
};

const invalidateSession = sessionId => {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
};

const createSession = (email, username) => {
  const sessionId = String(Object.keys(sessions).length + 1);

  const session = { sessionId, email, username,  valid: true };
  sessions[sessionId] = session;
  return session;
};

const getUser = email => {
  return users.find(user => user.email === email);
};

module.exports = {
  getSession,
  invalidateSession,
  createSession,
  getUser,
};
