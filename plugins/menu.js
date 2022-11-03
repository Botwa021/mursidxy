let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌───────────────────⬣
│           мυʀѕι∂ вσт-χмℓ
└┬────────────────✽
   │        「 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧 」
┌┤⬡ *Tersisa* : %limit Limit
││⬡ *Role* : %role
││⬡ *Level* : %level 
││⬡ *Exp* : %totalexp XP 
││⬡ *Hari* : %week
││⬡ *Tanggal* : %week %weton, %date
││⬡ *Tanggal Islam* : %dateIslamic
││⬡ *Waktu* : %time
│└────────────────✽
│⬡ *Runtime* : %uptime
│⬡ *Bailyes Version* : Multi Device 4.5.0
│⬡ *Server* : Panel/RDP
│⬡ *Database* : %rtotalreg dari %totalreg
│⬡ *Storage Used* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├─────────────────✽
│⬡ *Nama Owner* : Mursid S
│⬡ *Asal Kota* : Yogyakarta
│⬡ *Umur* : 18 Tahun
│⬡ *Ulang Tahun* : 25 Juli 2004
│⬡ *Hobi* : Coding, suka kamu, gamers
└───────────────────⬣
%readmore`.trim(),
  header: '┌──「 %category 」──⬣',
  body: '│⬡ %cmd %islimit %isPremium',
  footer: '└─────────⬣\n',
  after: `
┌──  *BIG THANKS TO*  ───⬣
│• Allah SWT
│• Nurutomo as wabot-aq
│• Istikmal as BochilGaming
│• Ariffb as stikerin
│• Aguz Familia
│• Ziv San
│• the.sad.boy01
│• Nayla Hanifah
│• Syahrul
│• Vanesha Desu
│• Aniq12
│• Amirul Dev
│• Rasell Comel
 | • Krizynofc
│• Kurukuumd
│• Mursid S
│• All Creator Bot
└─────────────⬣

*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let bzz = './anuu.mp3' //Ganti Nama File Nya ;v
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'RPG',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game',
    'rpg': 'RPG'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    
    /*********************** HITUNG MUNDUR ************************/
    const ultah = new Date('july 25, 2023 23:59:59')
    const sekarat = new Date().getTime() 
    const Kurang = ultah - sekarat
    const ohari = Math.floor( Kurang / (1000 * 60 * 60 * 24));
    const ojam = Math.floor( Kurang % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const onet = Math.floor( Kurang % (1000 * 60 * 60) / (1000 * 60))
    const detek = Math.floor( Kurang % (1000 * 60) / 1000)
    // Pemasangan ${ohari} Hari ${ojam} Jam ${onet} Menit ${detek} Detik
    
    
    
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let ziv = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 9998282719181899999,
    status: 404,
    surface : 404,
    message: `мυʀѕι∂ вσт-χмℓ`,
    orderTitle: '',
    thumbnail: await (await fetch('https://telegra.ph/file/f7a5c9629f27bd8fd920f.jpg')).buffer(),  //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
    if (teks == '404') {
    	      	let ori = `Hay kak, @${m.sender.split`@`[0]}
 
мυʀѕι∂ вσт-χмℓ adalah bot whatsapp yang di bangun dengan Nodejs, dengan menggunakan server yang sangat kencang, tapi tidak terlalu kencang-kencang banget.`
return conn.send2ButtonImg(m.chat, 'https://telegra.ph/file/36168d92fddef7d37f445.jpg', ori, `мυʀѕι∂ вσт-χмℓ`, 'ѕємυα ρєʀιɴтαн', '.? all', 'ᴅσɴαѕι', '.donasi',  m, { contextInfo: {  
              externalAdReply: {  
                mediaType: 2,
                mediaUrl: 'https://instagram.com/mursid.st',  
                title: 'ѕιмρℓє мυʀѕι∂ вσт-χмℓ',  
                body: 'ʙʏ ᴍᴜʀsɪᴅ xᴍʟ',  
                thumbnail: await (await fetch('https://telegra.ph/file/7bec33494d4de1afc4b26.jpg')).buffer()
              }  
          }}) 
    

    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: global.ucapan,
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //await conn.send3TemplateButtonImg(m.chat, `${global.image}`, text.trim(), wm, `ρємιℓιк вσт`, `${_p}owner`, `ʀυℓєѕ`, `${_p}rules`, `ᴅσɴαѕι`, `${_p}donasi`)
    await conn.fakeReply(m.chat, 'Loading...', '0@s.whatsapp.net', 'ву мυʀѕι∂-χмℓ (+6288233832771)', 'status@broadcast')
    //await conn.send2ButtonDoc(m.chat, text.trim(), `*Created By* : *@${global.owner[0].split('@')[0]}*\n*Official Bot By* : *@${'0'.split('@')[0]}*\n*Aktif selama : ${uptime}*`, `ρємιℓιк вσт`, `${_p}owner`, `ᴅσɴαѕι`, `${_p}donasi`, m)
    await conn.send2ButtonLoc(m.chat, await (await fetch('https://telegra.ph/file/fd4efb24c28ab7e5632b9.jpg')).buffer(), text.trim(), `*Created By* : *@${global.owner[0].split('@')[0]}*\n*Official Bot By* : *@${'0'.split('@')[0]}*\n*Aktif Selama : ${uptime}*`, `ρємιℓιк вσт`, `${_p}owner`, `ᴅσɴαѕι`, `${_p}donasi`, m)
await conn.sendFile(m.chat, fs.readFileSync('./anuu.mp3'), 'anuu.mp3', null, m, true, { 
 type: 'audioMessage',  
 ptt: true, 
seconds: 9999,
fileLength: 99999,
 ptt: true, contextInfo: { forwardingScore: 999, isForwarded: true, externalAdReply: {title: `υℓαɴg тαнυɴ мυʀѕι∂ ${ohari} нαʀι ${ojam} ᴊαм ${onet} мᴇɴιт ${detek} ᴅᴇтιк`, body: `${pickRandom(['мυʀѕι∂ вσт-χмℓ', 'мυʀѕι∂ вσт-χмℓ'])}`, sourceUrl: 'https://instagram.com/mursid.st', thumbnail: await (await fetch('https://telegra.ph/file/f7a5c9629f27bd8fd920f.jpg')).buffer(),}}  
      }) 
 } catch (e) {
    conn.reply(m.chat, 'мααƒ, мєɴυ ѕααт ιɴι ѕє∂αɴg єʀʀσʀ', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(m(enu)?|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 function pickRandom(list) { 
   return list[Math.floor(Math.random() * list.length)] 
 }
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}
