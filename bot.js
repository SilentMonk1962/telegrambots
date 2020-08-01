require('dotenv').config()
const Telegraf=require('telegraf');
const bot=new Telegraf(process.env.Bot_token);
bot.use(async(ctx,next)=>{
    ctx.state.akal=94940;
    const reqRaisedatTime=Date.now();
    const ms = Date.now()-reqRaisedatTime
    console.log(`Time taken to revert to message is ${ms} ms`)
    //await console.log(ctx);
    await next(ctx); //if you don't want to modify the context object then you don't need to pass it in next().
});

//now we are going to create a simple logger for our future project
bot.use((ctx,next)=>{
    console.log(ctx.chat);
    
    if(ctx.updateSubTypes[0]=='text'){
        bot.telegram.sendMessage(-481008034,`UserName: ${ctx.from.username} said: ${ctx.message.text} at ${new Date(ctx.message.date*1000)}`)
    }else{
        bot.telegram.sendMessage(-481008034,`UserName: ${ctx.from.username} sent us a ${ctx.updateSubTypes[0]}`);
    }
    next();
});

const helpMessage=`
I can do many things:
/start - to start the bot;
/help - to get more help;
/echo - will return "you said echo";
/echo <msg> -will echo whatever you said;
`

bot.start((ctx)=>{
    ctx.reply(`Thanks for starting me. It was getting lonely out here.`);
    ctx.reply(helpMessage);
});
bot.help((ctx)=>ctx.reply(`This is where you will get all info about me. `));

//we will now create handler for echo command
bot.command(['echo','Echo'],(ctx)=>{
let input=ctx.message.text;
let inputArray=input.split(' ');
let message="";
if(inputArray.length==1){
    message='You said echo.';
}else{
    inputArray.shift();
    message=inputArray.join(' ');
};
ctx.reply(message);
});

bot.launch();
