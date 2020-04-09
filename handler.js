// Prefix commands
const prefix = "!";

// Handler
exports.analizarMsg = analizarMsg;
exports.nuevoMiembro = nuevoMiembro;

function nuevoMiembro(member){

    var msg = "Hola <@"+ member.user +">, soy Seymour Skinner, para poder mostrarte el aula debes decirme en que CURSO estas y tu NOMBRE COMPLETO usando el comando \n" + 
    "!register <curso> <nombre_completo> \n" + 
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

        if(group.toUpperCase() == "GITHUB"){

            let role = message.guild.roles.cache.find(r => r.name === "GitHub");
            message.member.setNickname(name)
            message.member.roles.add(role);

        } else {

            message.channel.send("Ese grupo no existe");

        }

    } else {

        msg = "Faltan parametros. El comando es !register github <nombre_completo>\n" +
        "Por ejemplo !register github Christian Dario Nievas";

        message.channel.send(msg);

    }

}

function help(message){

    let msg = "!register <grupo> <nombre_completo>\n" +
    "Por ejemplo: !register github Christian Dario Nievas\n";
    message.channel.send(msg);

}