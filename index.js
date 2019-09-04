const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();
const weatherhandler = require('weather-js');



var degreeunit = 'F';


client.once('ready', ()=>{
    client.user.setActivity('The Weather',{type: "WATCHING"});
})

client.on('message', message =>{

    var msgcontent = message.content.slice(prefix.length).split(' ');
    var argument = msgcontent.slice(1);

    if(message.author.id == client.user.id){
        return;
    }


    
    if(message.content.startsWith(prefix + 'setunit')){
        
        if((argument == 'F') || (argument == 'C') || (argument == 'c') || (argument == 'f')){
            degreeunit = argument;
            message.channel.send(`Degree set to ` + degreeunit);
            return;
        }

        else{
            message.channel.send('Please define a valid unit (F or C)');
            return;
        }
    } //END OF SET UNIT COMMAND

    if(message.content.startsWith(prefix + 'w')){
        weatherhandler.find({search:argument.join(" "), degreeType: degreeunit}, function(err,result){
            if(err) message.channel.send(err);
            
            if(result.length == 0){
                message.channel.send("Please enter a valid location.");
                return;
            }
        
             var currweather = result[0].current;
             var location = result[0].location;

           

        const embed = new Discord.RichEmbed()
            .setTitle('Weather For ' + argument.join(" "))
            .setThumbnail(`${currweather.imageUrl}`)
            .setColor('#fca903')
            .setDescription('Requested by ' + message.author.username)
            .addField('Condition', `${currweather.skytext}`,false)
            .addField('Current Date At Location',`${currweather.date}` + ',' + `${currweather.day}`,false)
            .addField('Temperature', `${currweather.temperature} Degrees`,true )
            .addField('Feels Like',`${currweather.feelslike} Degrees`,true);
            

            message.channel.send({embed});
        });
   
   
    } //END OF WEATHER

 

});
client.login(token);