# GRK3D PRINT — Site

Site institucional da GRK3D PRINT (impressão 3D, modelagem e peças
personalizadas — Araucária/PR).

## Estrutura do projeto

```
grk3d-print/
├── index.html          → página do site
├── css/
│   └── styles.css       → todo o visual (cores, layout, responsivo)
├── js/
│   ├── main.js           → menu, animações, formulário de pedido e comentários
│   └── supabase-config.js → onde entram as chaves do Supabase (ainda vazio)
└── README.md
```

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (público) — ex: `grk3d-print`.
2. Suba os arquivos desta pasta para o repositório (mantendo a
   estrutura de pastas `css/` e `js/` como está).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", escolha a branch `main` e a pasta `/ (root)` → **Save**.
5. Em alguns minutos o GitHub mostra o link do site, algo como:
   `https://seu-usuario.github.io/grk3d-print/`.

Qualquer alteração que você enviar (`push`) para o repositório depois
atualiza o site automaticamente em 1-2 minutos.

## Sobre os comentários (importante)

Hoje os comentários são salvos no **localStorage** do navegador — ou
seja, cada pessoa só vê os comentários que ela mesma escreveu naquele
aparelho. Depois de publicado no GitHub Pages (que é um site estático,
sem banco de dados próprio), isso continua sendo uma limitação.

## Próximo passo: integração com Supabase

Para os comentários (e futuramente textos/cores editáveis) ficarem
salvos de verdade e visíveis para todo mundo:

1. Preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY` em
   `js/supabase-config.js` com os dados do seu projeto Supabase.
2. Descomente, no `index.html`, a linha do SDK do Supabase (procure o
   comentário `SUPABASE SDK` dentro de `<head>`).
3. Me avise que preencheu — eu troco as funções `loadComments()` e
   `persistComment()` em `js/main.js` para usarem o Supabase de verdade
   em vez do localStorage, e monto a versão "editor" conectada ao mesmo
   banco.

Nada precisa ser reescrito do zero: o código já está organizado
exatamente para esse encaixe.
