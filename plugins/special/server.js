const os = require('os')
exports.run = {
   usage: ['server'],
   category: 'utilities',
   async: async (m, {
      client
   }) => {
      try {
         const json = await Func.fetchJson('http://ip-api.com/json')
         delete json.status
         let caption = `乂  *S E R V E R*\n\n`
         caption += `┌  ◦  OS : ${os.type()} (${os.arch()} / ${os.release()})\n`
         caption += `│  ◦  Ram : ${Func.formatSize(process.memoryUsage().rss)} / ${Func.formatSize(os.totalmem())}\n`
         for (let key in json) caption += `│  ◦  ${Func.ucword(key)} : ${json[key]}\n`
         caption += `│  ◦  Uptime : ${Func.toTime(os.uptime * 1000)}\n`
         caption += `└  ◦  Processor : ${os.cpus()[0].model}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            ads: false,
            largeThumb: true,
            thumbnail: global.db.setting.cover
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}