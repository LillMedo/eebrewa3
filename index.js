const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.listen(() => {
  console.log('server started');
});
const {Client, Collection , MessageEmbed , MessageAttachment ,  MessageSelectMenu, MessageActionRow, MessageButton  } = require("discord.js");
const Discord = require('discord.js')

const client = new Discord.Client({
   intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
   ],
});
const prefix = `$`;
client.on('ready', (m) => {
  console.log(`Bot is On! ${client.user.tag}`);
  client.user.setStatus(`dnd`);
  client.user.setActivity(prefix + `help - Dev : Tope#0001`);
})




client.login(process.env.token);
const db = require('pro.db');








const {Canvas,resolveImage} = require('canvas-constructor/cairo');



client.on(`messageCreate`, message => {
  try {
    if(message.content.startsWith(prefix + `help`) || message.content.startsWith(prefix + `HELP`) || message.content.startsWith(prefix + `Help`)){
      let embed = new MessageEmbed()
      .setColor(`BLACK`)
      .setAuthor({ name: `${message.guild.name} - Help Commands`, iconURL: client.user.avatarURL() })
      .addField('General', '`help`, `color`, `edit img`, `remove img / delete img`', false)
      .addField('Admin', '`set channel`, `set price` , `sell`', false)
      .addField('Owner', '`add member`,  `remove member`, `edit img bot`, `edit name bot`', false)
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setFooter({ text: `Requested by ${message.author.tag} `, iconURL: message.author.avatarURL() });
      message.reply({ content: `Help!`, embeds: [embed] });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
${"```"}js\n${err}${"```"}`)
  }
});




client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `add member`)){
      if(m.author.id === `834439252783267900`){
        let args = m.content.split(" ").slice(2).join(" ");
        if(!args) return m.reply({ content: `الرجاء كتابة ايدي الشخص` });
        db.set(`color-${args}}`, `yes`);
        m.reply({ content: `تم اضافة الشخص` })
      }
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});

client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `remove member`)){
      if(m.author.id === `834439252783267900`){
        let args = m.content.split(" ").slice(2).join(" ");
        if(!args) return m.reply({ content: `الرجاء كتابة ايدي الشخص` });
        db.set(`color-${args}}`, `no`);
        m.reply({ content: `تم ازالة الشخص` })
      }
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});


client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `edit img bot`)){
      if(m.author.id === `834439252783267900`){
        let args = m.content.split(" ").slice(3).join(" ") || m.attachments.first()?.proxyURL;
        if(!args) return m.reply({ content: `الرجاء ارفاق او ارسالة رابط صورة` });
        client.user.setAvatar(args);
        m.reply({ content: `تم تغير الصورة` })
      }
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});

client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `edit name bot`)){
      if(m.author.id === `834439252783267900`){
        let args = m.content.split(" ").slice(3).join(" ");
        if(!args) return m.reply({ content: `الرجاء كتابة الاسم الجديد` });
        client.user.setUsername(args);
        m.reply({ content: `تم تغير الاسم` })
      }
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});



client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `set channel`)){
      if(!m.member.permissions.has(`ADMINISTRATOR`)) return;
      let args = m.content.split(" ").slice(2).join(" ");
        if(!args) return m.reply({ content: `الرجاء كتابة ايدي القناة` });
        if(!m.guild.channels.cache.get(args)) return m.reply({ content: `القناة غير موجوده` });
      db.set(`channel-${m.guild.id}`, args);
      m.reply({ content: `تم تعين القناة` });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});

client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `set price`)){
      if(!m.member.permissions.has(`ADMINISTRATOR`)) return;
      let args = m.content.split(" ").slice(2).join(" ");
        if(!args) return m.reply({ content: `الرجاء كتابة السعر` });
      db.set(`price-${m.guild.id}`, args);
      m.reply({ content: `تم تغير السعر` });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});


client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `sell`)){
      if(!m.member.permissions.has(`ADMINISTRATOR`)) return;
      let args = m.content.split(" ").slice(1).join(" ") ||  m.attachments.first()?.proxyURL;
      if(!args) return m.reply({ content: `الرجاء ارفاق صورة او رابط` });
      if(!db.get(`channel-${m.guild.id}`)) return m.reply({ content: `الرجاء تعين قناة باستخدام الامر التالي\n${prefix}set channel` });
      let channel = m.guild.channels.cache.find(s => s.id === db.get(`channel-${m.guild.id}`));
      channel.send({ files: [args] });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});



client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `edit img`)){
      if(m.content === prefix + `edit img bot`)
      if(!db.get(`color-${m.author.id}`) || db.get(`color-${m.author.id}`) === `no`) return;
      let args = m.content.split(" ").slice(1).join(" ") ||  m.attachments.first()?.proxyURL;
      if(!args) return m.reply({ content: `الرجاء ارفاق صورة او رابط` });
      db.set(`img-${m.author.id}`, args);
      m.reply({ content: `تم تغير الخلفية` });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});


client.on(`messageCreate`, m => {
  try {
    if(m.content.startsWith(prefix + `remove img`) || m.content.startsWith(prefix + `delete img`)){
      if(!db.get(`color-${m.author.id}`) || db.get(`color-${m.author.id}`) === `no`) return;
      let args = m.content.split(" ").slice(1).join(" ") ||  m.attachments.first()?.proxyURL;
      if(!args) return m.reply({ content: `الرجاء ارفاق صورة او رابط` });
      db.set(`img-${m.author.id}`, `https://media.discordapp.net/attachments/974959451968782346/1223593462411300906/NQ.png?ex=661a6b36&is=6607f636&hm=42ebc6e945520ae7959382db&=&format=webp&quality=lossless`);
      m.reply({ content: `تم ازالة الخلفية` });
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});





client.on(`messageCreate`, async message => {
  try {
    if(message.content.startsWith(prefix + `coloring`)){
      //if(!db.get(`color-${message.author.id}`) || db.get(`color-${message.author.id}`) === `no`) return;
      let attach = message.attachments.first()?.proxyURL || message.content.split(' ').slice(1).join(' ')
      if(!attach) return message.reply({ content: `الرجاء ارفاق صورة او ارسال رابط` });
        {
        async function generateCanvas() {
        const canvas = new Canvas(960, 540)
          .printImage(await resolveImage(`https://media.discordapp.net/attachments/974959451968782346/1223593462411300906/NQ.png?ex=661a6b36&is=6607f636&hm=42ebc6e945520ae7959382db&=&format=webp&quality=lossless`), 0,0, 960,540)
          .setColor('#00ffff')
          .printCircle(130, 200, 100, 100)
          .setColor('#ff00fe')
          .printCircle(130, 420, 100, 100)
          .setColor('#0000fe')
          .printCircle(350, 200, 100, 100)
          .setColor('#fe0000')
          .printCircle(350, 420, 100, 100)
          .setColor('#6b00fe')//
          .printCircle(610, 200, 100, 100)
          .setColor('#ffff00')
          .printCircle(610, 420, 100, 100)
          .setColor('#00ff01')
          .printCircle(830, 200, 100, 100)
          .setColor('#ff8a00')
          .printCircle(830, 420, 100, 100)
          .printCircularImage(await resolveImage(attach), 130, 200, 100,100)
          .printCircularImage(await resolveImage(attach), 130, 420, 100,100)
          .printCircularImage(await resolveImage(attach), 350, 200, 100,100)
          .printCircularImage(await resolveImage(attach), 350, 420, 100,100)
          .printCircularImage(await resolveImage(attach), 610, 200, 100,100)
          .printCircularImage(await resolveImage(attach), 610, 420, 100,100)
          .printCircularImage(await resolveImage(attach), 830, 200, 100,100)
          .printCircularImage(await resolveImage(attach), 830, 420, 100,100)
          .printCircularImage(await resolveImage(message.guild.iconURL({ format: 'jpg', dynamic: false })), 480, 50, 40,40)

          .toBuffer();
        return canvas
        }
        message.channel.send({ files: [await generateCanvas()] }).then(m => {
          message.delete();
        })
      }
    }
  } catch (err) {
    message.channel.send(`الرجاء التواصل مع توبي واعطاؤه هذا الكود
  ${"```"}js\n${err}${"```"}`)
  }
});


