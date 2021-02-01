const config = require('./config')()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(config.botTelegram)

bot.start((ctx) => {
  ctx.reply(`Hello @${ctx.message.from.username}`)
})

//bot.telegram.getMe().then(botInfo => console.log(botInfo))
bot.command(['botCarGDev'], (ctx) => {
  ctx.reply('Twitter: https://twitter.com/CarGDev')
})

bot.command(['date', 'hour'], ctx => ctx.reply((new Date()).toString()))

let modeBadWords = false

bot.on('text', ctx => {
  const msg = ctx.message.text
  
  const badWordArr = ['holy shit', 'gonorrea', 'puto', 'mamón', 'mamon', 'marico', 'pendejo', 'pinche', 'culero', 'arriba el américa', 'odiame mas']
  const inc = msg.includes('@CarGDev')
  const includeBot = msg.includes('@cargdevBot')
  const convCol = msg.includes('conCol')
  const convMex = msg.includes('conMex')
  const msgArr = msg.split('')
  const activateBadWords = msg.includes('Activar groserias mode')
  const deActivateBadWords = msg.includes('Desactivar groserias mode')
  if (activateBadWords) modeBadWords = true
  if (deActivateBadWords) modeBadWords = false

  const converter = (arr, con, coin) => {
    let numbers = []
    arr.map(x => {
      if (!isNaN(parseInt(x)) || x === '.') numbers = numbers.concat(x)
    }) 
    numbers = numbers.join('')
    if (coin === 'Col') return `$ ${numbers} colombianos a mexicanos son $ ${(numbers * con).toFixed(2)}`
    return `$ ${numbers} mexicanos a colombianos son $ ${(numbers * con).toFixed(2)}`
  }

  badWordArr.map(x => {
    if ((msg.toLowerCase().includes(x)) && modeBadWords) ctx.reply(`@${ctx.message.from.username} dijiste una mala palabra`)
  })
  
  if (inc) ctx.reply(`En un momento mas te contesto, por el momento debo estar ocupado gracias @${ctx.message.from.username}`)
  if (includeBot) ctx.reply(`Yo solo soy un bot mas @${ctx.message.from.username}`)
  if (convCol) {
    const mexican = 0.0057
    const conCo = converter(msgArr, mexican, 'Col')
    ctx.reply(`@${ctx.message.from.username} => ${conCo}`)
  }
  if (convMex) {
    const colombian = 174.56
    const conMe = converter(msgArr, colombian, 'Mex')
    ctx.reply(`@${ctx.message.from.username} => ${conMe}`)
  }
})

bot.on('sticker', ctx => {
  //console.log(ctx.message.from.username)
  ctx.reply(`Que chido sticker @${ctx.message.from.username}`)
})

bot.launch()

