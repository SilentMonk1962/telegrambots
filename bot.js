require('dotenv').config()
const Telegraf=require('telegraf');
const bot=new Telegraf(process.env.Bot_token);
bot.use(async(ctx,next)=>{
    console.log(ctx)
    ctx.state.akal=94940;
    const reqRaisedatTime=new Date();
    const ms = new Date()-reqRaisedatTime
    console.log(`Time taken to revert to message is ${ms} ms`)
    await next(ctx);
});
const helpMessage=`
I can do many things
/start - to start the bot
/help - to get more help
`

bot.start((ctx)=>{
    ctx.reply(`Thanks for starting me. It was getting lonely out here.`);
    ctx.reply(helpMessage);
});
bot.help((ctx)=>ctx.reply(`This is where you will get all info about me. `))
bot.launch();
