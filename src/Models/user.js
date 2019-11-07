const connection = require('../Configs/connect');

module.exports= {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users`;
      connection.query(sql , 
        (err, response) => {
        if (!err) {
          resolve(response)
        } else {
          reject(err)
        }
      })
    })
  },
  registerUser: (data) => {
      return new Promise((resolve, reject) => {
        const sql = `INSERT users SET ?`;
        connection.query(sql , [data], 
          (err, response) => {
          if (!err) {
            resolve(response)
          } else {
            reject(err)
          }
        })
      })
    },
    loginUser: (data) => {
      console.log(data)
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE username= ? `;
        connection.query(sql , [data.username], 
          (err, response) => {
          if (!err) {
            resolve(response)
          } else {
            reject(err)
          }
        })
      })
    },
    registerCheck: (data) => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE username=? OR email=?`;
        connection.query(sql , [data.username, data.email], 
          (err, response) => {
          if (!err) {
            resolve(response)
          } else {
            reject(err)
          }
        })
      })
    }
}