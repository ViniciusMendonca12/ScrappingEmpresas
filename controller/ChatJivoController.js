var axios = require('axios');
var cheerio = require('cheerio');

const url = 'https://app.jivosite.com/chat/archive/13840_chat-2209918-13840';


async function pegarChatJivo() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let chatJivo = [];

        $('.messages-container').each((index, element) => {
            if (index >= 5) return;  // Interrompe o loop após 5 iterações
        
            const linhaChat = $(element).find('.container__vhTNz .row__N_s1e .content__hoAbF span').text().trim();
            // const link = $(element).find('a').attr('href');
            console.log(linhaChat.length); // Verificar se o elemento está sendo encontrado
            console.log(linhaChat.text()); // Tentar obter o texto do elemento
            chatJivo.push({
                teste:linhaChat
            });
        });
        
        console.log("chat Jivo:");
        console.log(chatJivo)

        // for (let noticia of noticias) {
        //     await pegarDetalhesNoticias(noticia);
        // }

        return chatJivo
    } catch (error) {
        console.error('Erro ao capturar as notícias:', error);
    }
}

async function olaMundo(req, res) {
    try {
        var resultadoScrap = await pegarChatJivo()
        console.log("teste")
        res.send(resultadoScrap)
        
    } catch (error) {
        
    }
}


module.exports = {
    olaMundo
};