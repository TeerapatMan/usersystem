'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Database = use('Database')
class UserSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Token.truncate()
    await User.truncate()
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
    
    let user = new User()
    user.username = "admin"
    user.password = 'password'
    user.email = 'admin@app.com'
    await user.save()
  }
}

module.exports = UserSeeder
