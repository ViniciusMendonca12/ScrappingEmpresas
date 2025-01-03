const express = require("express");
const app = express();

const puppeteer = require("puppeteer");

async function extractLinksFromTable() {
  const url =
    "https://www.google.com/search?q=software+house+em+sao+paulo&sca_esv=2dd386abfc4b3461&rlz=1C1CHZN_pt-BRBR965BR965&biw=1366&bih=633&tbm=lcl&sxsrf=ADLYWIJ1KnlpRd8xFRYBn0vOAxQTk_ejzw%3A1735929192779&ei=aC14Z4OaL8Sc1sQP5IT9kAs&ved=0ahUKEwiD7o-XmNqKAxVEjpUCHWRCH7IQ4dUDCAo&uact=5&oq=software+house+em+sao+paulo&gs_lp=Eg1nd3Mtd2l6LWxvY2FsIhtzb2Z0d2FyZSBob3VzZSBlbSBzYW8gcGF1bG8yBBAjGCcyBhAAGBYYHjIIEAAYgAQYogQyBRAAGO8FMggQABiABBiiBDIIEAAYgAQYogRI3Q9QmgRYuQ1wAXgAkAEAmAF8oAHKCKoBBDAuMTC4AQPIAQD4AQGYAgugAuoIwgIGEAAYDRgewgIIEAAYFhgKGB6YAwCIBgGSBwQxLjEwoAeXOw&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[-23.41171029583368,-46.25737717525374],[-23.718896699828328,-46.893309546426]]";

  const browser = await puppeteer.launch({ headless: false }); // Visualizar o navegador
  const page = await browser.newPage();

  console.log("Acessando URL:", url);

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await new Promise(resolve => setTimeout(resolve, 4000)); // Espera 2 segundos

  const buttons = await page.$$('.WvCRR');  // Seleciona todos os botões com a classe 'WvCRR'
  if (buttons.length > 0) {
    await buttons[1].click();  // Clica no segundo botão
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 2 segundos

      console.log("Botão clicado com sucesso!");
  } else {
      console.log("Botão não encontrado!");
  }
    // Espera que um elemento específico carregue (exemplo)
    await page.waitForSelector("table");


  // Espera pela tabela
  await page.waitForSelector("table");

  // Extrai os links dentro do <a> em cada <td> do <tr>
  const links = await page.evaluate(() => {
    const rows = document.querySelectorAll("table tbody tr");
    let extractedLinks = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td"); // Seleciona todas as células
      cells.forEach((cell) => {
        const anchors = cell.querySelectorAll("a"); // Seleciona todos os <a> dentro da célula
        anchors.forEach((anchor) => {
          extractedLinks.push(anchor.href); // Adiciona o href ao array
        });
      });
    });

    return extractedLinks; // Retorna todos os links encontrados
  });
  links.pop();

  console.log(links.length);
  if (links.length > 1) {
    console.log("quantidade de links" + links.length);
    console.log("Links encontrados:", links);
    // aqui continuo agr com a msm função de capturar emails mas agr com esses novos links
  } else {
    console.log("essa página tem apenas um passador");
  }

  await browser.close();
}

extractLinksFromTable();
