let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌──────═┅═───────⬣
│            *мυʀѕι∂-χмℓ*
└┬──────────────┈ ⳹
   │     「 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」
┌┤• *Tersisa* : %limit Limit
││• *Role* : %role
││• *Level* : %level 
││• *Exp* : %totalexp XP 
││• *Hari* : %week
││• *Tanggal* : %week %weton, %date
││• *Tanggal Islam* : %dateIslamic
││• *Waktu* : %time
│└──────────────┈ ⳹ 
│        「 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 」
│• *Uptime* : %uptime / %muptime
│• *Bailyes Version* : 4.2.0
│• *Database* : %rtotalreg dari %totalreg
│• *Memory Used* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├───────────────┈ ⳹
│       「 𝗚𝗥𝗨𝗣 𝗕𝗢𝗧 」
│• bit.ly/grup-wabot-aq¹
│• bit.ly/grup-wabot-aq²
│• bit.ly/grup-wabot-aq³
│• bit.ly/grup-wabot-aq⁴
└──────═┅═───────⬣
%readmore`.trim(),
  header: '┌──「 %category 」──⬣',
  body: '│• %cmd %islimit %isPremium',
  footer: '└────═┅═────⬣\n',
  after: `
┌──  *BIG THANKS TO*  ───⬣
│• Allah SWT
│• Nurutomo as wabot-aq
│• Istikmal as BochilGaming
│• Ariffb as stikerin
│• Aguz Familia
│• Syahrul
│• Vanesha Desu
│• Aniq12
│• Amirul Dev
│• Rasell Comel
│• Faudzan
│• Krisna
│• Fatur as Ftwrr
 | • Krizyn_Ofc
│• Ziv San
│• Mursid S
│• Nadia Cans
│• Nayla
│• All Creator Bot
└─────═┅═─────⬣

*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let haori = './anuu.mp3' // SCRIPT ORIGINAL BY FAMILY MD
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

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
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    const hariRaya = new Date('January 1, 2023 23:59:59')
    const sekarang = new Date().getTime()
    const Selisih = hariRaya - sekarang
    const jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const mmmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60))
    const ddetik = Math.floor( Selisih % (1000 * 60) / 1000)
    const hariRayaramadan = new Date('April 21, 2023 23:59:59')
    const sekarangg = new Date().getTime()
    const lebih = hariRayaramadan - sekarangg
    const harii = Math.floor( lebih / (1000 * 60 * 60 * 24));
    const jamm = Math.floor( lebih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const menitt = Math.floor( lebih % (1000 * 60 * 60) / (1000 * 60))
    const detikk = Math.floor( lebih % (1000 * 60) / 1000)
    const natal = new Date('December 24, 2022 23:59:59')
    const sekara = new Date().getTime()
    const Kuran = natal - sekara
    const ahari = Math.floor( Kuran / (1000 * 60 * 60 * 24));
    const ajam = Math.floor( Kuran % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const anet = Math.floor( Kuran % (1000 * 60 * 60) / (1000 * 60))
    const aetek = Math.floor( Kuran % (1000 * 60) / 1000)
    let pe = '```'
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
    if (teks == '404') {
      let judul =  `${global.ucapan}, ${name},      
┌──────═┅═──────⬣
│    *Hai*,  @${m.sender.split`@`[0]}
└┬────────────┈ ⳹
┌┤• Nama : ${name}
││• Limit : ${limit}
││• Waktu : ${time}
││• Total Xp : ${exp}
││• Role : ${role}
││• Tag : @${m.sender.split`@`[0]}
││• Status : ${global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Owner' : 'Users'}
│└────────────┈ ⳹
│         「 ACARA 」
│• *Tahun Baru*
│ ${jhari} Hari ${jjam} Jam ${mmmenit} Menit ${ddetik} Detik
│• *Ramadan*
│ ${harii} Hari ${jamm} Jam ${menitt} Menit ${detikk} Detik
│• *Natal*
│ ${ahari} Hari ${ajam} Jam ${anet} Menit ${aetek} Detik
└──────═┅═──────⬣
`.trim()
    if (teks == '404') {
      let judul = `${global.ucapan}, ${name}`.trim()
      const sections = [
      {
        title: '𝙻𝚒𝚜𝚝 𝙼𝚎𝚗𝚞 𝙽𝚊𝚍𝚒𝚊 𝙱𝚘𝚝 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙',
        rows: [
          { title: '𝑺𝒆𝒎𝒖𝒂 𝒑𝒆𝒓𝒊𝒏𝒕𝒂𝒉', rowId: `${_p}? all` },
          { title: '𝑮𝒂𝒎𝒆', rowId: `${_p}? game` },
          { title: '𝑬𝒙𝒑', rowId: `${_p}? xp` },
          { title: '𝑺𝒕𝒊𝒄𝒌𝒆𝒓', rowId: `${_p}? stiker` },
          { title: '𝑲𝒆𝒓𝒂𝒏𝒈 𝒂𝒋𝒂𝒊𝒃', rowId: `${_p}? kerangajaib` },
          { title: '𝑸𝒖𝒐𝒕𝒆𝒔', rowId: `${_p}? quotes` },
          { title: '𝑮𝒓𝒖𝒑', rowId: `${_p}? grup` },
          { title: '𝑷𝒓𝒆𝒎𝒊𝒖𝒎', rowId: `${_p}? premium` },
          { title: '𝑰𝒏𝒕𝒆𝒓𝒏𝒆𝒕', rowId: `${_p}? internet` },
          { title: '𝑨𝒏𝒐𝒏𝒚𝒎𝒐𝒖𝒔', rowId: `${_p}? anonymous` },
          { title: '𝑵𝒖𝒍𝒊𝒔 & 𝒍𝒐𝒈𝒐', rowId: `${_p}? nulis` },
          { title: '𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓', rowId: `${_p}? downloader` },
          { title: '𝑻𝒐𝒐𝒍𝒔', rowId: `${_p}? tools` },
          { title: '𝑭𝒖𝒏', rowId: `${_p}? fun`},
          { title: '𝑫𝒂𝒕𝒂𝒃𝒂𝒔𝒆', rowId: `${_p}? database` },
          { title: '𝑽𝒐𝒕𝒆 & 𝒂𝒃𝒔𝒆𝒏', rowId: `${_p}? vote` },
          { title: "𝑨𝒍-𝑸𝒖𝒓\'𝒂𝒏", rowId: `${_p}? quran` },
          { title: '𝑷𝒆𝒏𝒈𝒖𝒃𝒂𝒉 𝒔𝒖𝒂𝒓𝒂', rowId: `${_p}? audio` },
          { title: '𝑱𝒂𝒅𝒊 𝒃𝒐𝒕', rowId: `${_p}? jadibot` },
          { title: '𝑰𝒏𝒇𝒐', rowId: `${_p}? info` },
          { title: '𝑻𝒂𝒏𝒑𝒂 𝒌𝒂𝒕𝒆𝒈𝒐𝒓𝒊', rowId: `${_p}? tanpakategori` },
          { title: '𝑶𝒘𝒏𝒆𝒓', rowId: `${_p}? owner` },
        ]
      }
    ]
    const listMessage = {
      text: judul,
      footer: wm,
      mentions: await conn.parseMention(judul),
      title: '',
      buttonText: "𝗖𝗹𝗶𝗰𝗸 𝗛𝗲𝗿𝗲",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
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
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
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
    await conn.send3TemplateButtonImg(m.chat, `${global.image}`, text.trim(), wm, `⍴ᥱmіᥣіk ᑲ᥆𝗍`, `${_p}owner`, `rᥙᥣᥱs`, `${_p}rules`, `ძ᥆ᥒᥲsі`, `${_p}donasi`)
 conn.sendFile(m.chat, haori, 'anuu.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true
     }) 
 } catch (e) {
    conn.reply(m.chat, 'mᥲᥲ𝖿 mᥱᥒᥙ sᥱძᥲᥒg ᥱrr᥆r', m)
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
