const users  = [
  { id: 1, username: 'John', email: 'john@example.com', password: 'pass', age: 30 },
  { id: 2, username: 'Jane', email: 'jane@example.com', password: 'pass', age: 25 },
  { id: 3, username: 'admin', email: 'admin@example.com', password: 'password', age: 25 }
]

const getUsers = () => users

const getUserById = (id) => users.find(user => user.id === parseInt(id))

export { getUsers, getUserById }