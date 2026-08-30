# Site da Raiz, v2

## O que mudou nesta versão

A copy saiu do eixo "quem somos" e entrou no eixo "o que a gente faz". Três
consequências práticas:

1. A home agora tem uma seção nova, **por que isso é mais difícil do que parece**,
   que é o argumento de venda de verdade: o trajeto é longo, o parque é gigante e
   os passeios padrão vão sempre nas mesmas lagoas, e planejar sozinho come as férias.
2. Entrou uma seção **o que está incluído**, com oito itens concretos. É o que
   transforma "concierge" em serviço que dá para comprar.
3. Os fundadores viraram credencial curta, não biografia. Sem tempo de moradia,
   sem detalhe pessoal. Yasminn: morou nos Lençóis, viaja assim em todo lugar.
   Elvis: vinte e quatro estados.

A voz passou de "eu" para "nós". A marca fala como empresa, com nome próprio só
onde a credencial importa.

## Estrutura

```
index.html              detecta o idioma e manda para /en/, /pt/, /fr/ ou /es/
robots.txt              aponta para o sitemap
sitemap.xml             as 12 páginas, com alternates por idioma
style.css               estilo compartilhado
app.js                  header, animações, acordeão
img/                    17 fotos suas, tratadas
brand/                  logos e ícone

en/index.html   en/lencois-maranhenses.html   en/wind-route.html
pt/index.html   pt/lencois-maranhenses.html   pt/rota-dos-ventos.html
fr/index.html   fr/lencois-maranhenses.html   fr/route-des-vents.html
es/index.html   es/lencois-maranhenses.html   es/ruta-de-los-vientos.html
```

## Por que uma URL por idioma

Google, Bing e Yahoo indexam URL, não estado de JavaScript. Na versão anterior só
o inglês era indexável. Agora as doze páginas existem de verdade, cada uma com
`canonical` e com `hreflang` apontando para as outras três línguas. Você pode
disputar busca em francês e espanhol, onde a concorrência é muito menor do que em
inglês.

Cada página também carrega JSON-LD de `TravelAgency`, e a home carrega `FAQPage`,
que é o que faz as perguntas aparecerem direto no resultado de busca.

## Como editar a copy

**Não edite os arquivos HTML.** Eles são gerados. Edite o texto em:

```
src/content_en.py    inglês (é o master)
src/content_pt.py    português
src/content_fr.py    francês
src/content_es.py    espanhol
```

Depois rode `python3 src/build.py` e os doze arquivos são regerados.

Se você não quiser mexer em Python, me diga o que mudar e eu regero.

## Antes de subir

1. **Troque o domínio.** Em `src/build.py`, a variável `DOMAIN` está como
   `https://raiz.com.br`. Ela alimenta canonical, hreflang, sitemap e Open Graph.
   Com o domínio errado, todo o SEO aponta para o lugar errado.
2. **Depoimentos.** A seção está marcada como rascunho de propósito, com os textos
   entre colchetes. Nada ali foi escrito por nós. Coloque a frase real do Alex e do
   Gabriel em `content_*.py`, apague a classe `draft` e o `span.flag` no
   `src/build.py`.
3. **Foto do Elvis.** O bloco dele ainda usa a foto de uma estrada, marcada com
   comentário no código.
4. **Formulário do guia.** O `action` está em `#` e por enquanto cai num email para
   você. Troque pelo endpoint da sua ferramenta de lista.
5. **Instagram.** Os links apontam para `instagram.com/raizbrasil`. Confirme.
6. **Os dois calendários** (época das lagoas e janela de vento) são a nossa melhor
   leitura, não uma verificação sua. Revise antes de publicar.

## Sobre o seletor de moeda

Tirei o seletor de moeda que estava no topo. Motivo: não existe nenhum preço no
site para ele mudar, então ele era um botão que não fazia nada, o que é pior do
que não ter botão. A informação continua no site, escrita, no card
"pague na sua moeda" e na pergunta "como eu pago". Quando existir um produto com
preço, o seletor volta em dez minutos.

## Detalhes técnicos

- Sem framework, sem cookie, sem rastreador. Só HTML, CSS e um arquivo de JS de 2 KB.
- Fontes Newsreader e Karla, do Google Fonts, com Georgia e Arial de fallback, que
  é o que o manual da marca define.
- Fotos em JPEG progressivo, cerca de 9 MB no total. Se ficar lento no 4G, o
  próximo passo é gerar WebP.
- Acessibilidade: link de pular para o conteúdo, foco visível, `alt` em todas as
  imagens, acordeão com `details` nativo e `prefers-reduced-motion` respeitado.
- Testado em 1440px e 390px, sem erro de JavaScript.
