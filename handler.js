const fs = require("fs"); 

// Prefix commands
const prefix = "!";
const folderAsis = "/home/cdn/Escritorio/"

// Handler
exports.analizarMsg = analizarMsg;
exports.nuevoMiembro = nuevoMiembro;

function nuevoMiembro(member){

    var msg = "Hola <@"+ member.user +">, soy Seymour Skinner, para poder mostrarte el aula debes decirme en que CURSO estas y tu NOMBRE COMPLETO usando el comando \n" + 
    "!register <curso> <nombre_completo> sin los <>\n" + 
    "Por ejemplo: !register github Christian Dario Nievas\n" + 
    "Si lo haces bien, luego podremos disfrutar de unas deliciosas hamburguejas al vapor.";
    var channel = member.guild.channels.cache.find(c => c.name === "bienvenido");
    channel.send(msg);

}

function analizarMsg(message){

    if (message.author.bot) return;

    if (checkComm(message,"register")){
        register(message);
    } else if(checkComm(message,"start")){
        start(message);
    } else if (checkComm(message,"help")){
        help(message);
    } else if(checkComm(message,"asistencia")){
        asistencia(message);
    } else if (checkComm(message,"")){
        message.channel.send("Si necesitas ayuda tipea el comando !help");
    }

}

function checkComm(message,str){
    return message.content.startsWith(prefix + str);
}

// Functions
function register(message){

    let msgArr = message.content.split(" ",3);

    if(msgArr.length == 3){

        let [comm, group, ...name] = message.content.split(" ");
        name = name.join(" ");

        if(name.length >= 32){
	    message.channel.send("Ese nombre es muy largo, tiene que ser menor que 32 caracteres");
	    return;
	}

        if(group.toUpperCase() == "GITHUB"){

            let role = message.guild.roles.cache.find(r => r.name === "GitHub");
            message.member.setNickname(name)
            message.member.roles.add(role);
	    console.log("Añadi rol a " + name );

        } else {

            message.channel.send("Ese grupo no existe");

        }

    } else {

        msg = "Faltan parametros. El comando es !register <curso> <nombre_completo> sin los <>\n" +
        "Por ejemplo !register github Christian Dario Nievas";

        message.channel.send(msg);

    }

}

function help(message){

    let msg = "!register <grupo> <nombre_completo> sin los <>\n" +
    "Por ejemplo: !register github Christian Dario Nievas\n";
    message.channel.send(msg);

}

function asistencia(message){

    if(message.member.id === "200787812977475584"){

        let voiceChannel = message.member.voice.channel
        if(voiceChannel !== null){
            
            let msgArr = message.content.split(" ")
            
            if(msgArr.length == 2){

                let alumnos = message.member.voice.channel.members;
                
                strToPrint = ""

                for (let alumno of alumnos){
                    strToPrint = strToPrint + alumno[1].nickname + "\n";
                }

                var writeStream = fs.createWriteStream(folderAsis + msgArr[1] + ".txt");
                writeStream.write(strToPrint);
                writeStream.end();

            } else {

                message.channel.send("Te faltan parametros");

            }
    
        } else {

            message.channel.send("No estas conectado a ningun canal de voz");

        }

    } else {
        message.channel.send("Vos no sos el profesor pillin :)");
    }

}