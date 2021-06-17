const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) { 
          if (users[i].username === username) {
          const good = bcrypt.compareSync(password, users[i].passwordHash)
          if (good){
           
            let usersToReturn = {...users[i]}
            delete usersToReturn.passwordHash
            res.status(200).send(usersToReturn)
           
        }
          }

        }
      
      
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        
        let user = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
      
        users.push(user)
        console.log(users)
        let usersToReturn = {...user}
        delete usersToReturn.passwordHash
        res.status(200).send(usersToReturn)
    }
}