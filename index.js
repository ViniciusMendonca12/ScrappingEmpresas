const express = require('express');
const app = express();
var router = require("./routes/routes")
const port = 3000;


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))
app.use("/", router)


/* const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const jQuery = require('jquery');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head>
    <title>jQuery with Node.js</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <div id="content">This is sontent</div>
</body>
</html>
`); */

/* const $ = jQuery(dom.window);(dom.window);;
 */


const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
var axios = require('axios');

(async () => {
    const browser = await puppeteer.launch({
      headless: false, // `headless: false` para visualizar
      args: ['--disable-extensions', '--disable-infobars', '--disable-gpu', '--no-sandbox']
    });
  
    const page = await browser.newPage();
  
    // Acessar a página de login
    await page.goto('https://app.jivosite.com/login');
  
    // Preencher os campos de login
    await page.type('[data-qa-id="login-email-input"] ', 'vivicomferreira12@gmail.com'); // Substitua pelos seletores reais
    await page.type('[data-qa-id="login-password-input"]', 'Familia100@');
  
    const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
  
    await page.click('.btn-success');
    await page.waitForNavigation({ waitUntil: 'load' });
  
    await wait(10000); // Esperar 10 segundos após o login
  
    // Acessar o Google
    await page.goto('https://app.jivosite.com/chat/archive/4_chat-2551406-4', { waitUntil: 'networkidle2' });
  
    const content = await page.content();

    await wait(10000); // Esperar 10 segundos após o login

            const { data } = await axios.get('https://app.jivosite.com/chat/archive/4_chat-2551406-4');
            const $ = cheerio.load(data);
    
            let chatJivo = [];
            

          /*   elementos.each((index, element) => {
                const linhaChat = $(element).text().trim();
                chatJivo.push({
                    teste: linhaChat
                });
                console.log("Aola");
            });
 */

            // Seleciona todos os elementos de mensagem
const mensagens = document.querySelectorAll('.msgList__J8h24 .messageBody__CdqZN');

// Itera sobre as mensagens e imprime o conteúdo delas
mensagens.forEach(mensagem => {
  const conteudo = mensagem.querySelector('.content__hoAbF').textContent.trim();
  console.log(conteudo); // Exibe o conteúdo da mensagem
});
/* 
            console.log("Aola fim")

            console.loghhttyhthtg(chatJivo) */


            await browser.close();
  })();
  


app.get('/', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});