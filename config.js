'use strict'
require('dotenv').config()

module.exports = function config () {
  const config = {
    dev: process.env.NODE_ENV !== 'production',
    botTelegram: process.env.botTelegram
      
  }

  return config
  
}

