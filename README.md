# Booklist — Catálogo de livros

Aplicação React + TypeScript para listar, cadastrar, atualizar o status e remover livros usando a API REST do [CrudCrud](https://crudcrud.com/).

## Requisitos

- Node.js 20 ou superior
- npm
- Uma URL/chave criada em https://crudcrud.com/

## Como executar

1. Crie uma API no CrudCrud e copie a URL única exibida.
2. Na raiz do projeto, crie um arquivo `.env` a partir do `.env.example`.
3. Edite `VITE_CRUDCRUD_URL`, mantendo o caminho `/books` no final. Exemplo:

   ```env
   VITE_CRUDCRUD_URL=https://crudcrud.com/api/SUA_CHAVE_UNICA/books
   ```

4. Instale as dependências e inicie:

   ```bash
   npm install
   npm run dev
   ```

5. Abra o endereço informado pelo Vite.

> A chave do CrudCrud tem validade limitada. Se expirar, gere outra no site e atualize o `.env`.

## Funcionalidades

- **GET:** carrega os livros ao abrir a aplicação.
- **POST:** cadastra título, autor e status.
- **DELETE:** remove um livro pelo `_id`.
- **PUT:** alterna o status entre `Lido` e `Não lido`.

## Estrutura

```text
src/
├── components/
│   ├── BookForm.tsx
│   ├── BookItem.tsx
│   └── BookList.tsx
├── services/
│   └── bookService.ts
├── types/
│   └── book.ts
├── App.tsx
├── main.tsx
└── styles.css
```

## Publicar no GitHub

Crie um repositório público e execute na pasta do projeto:

```bash
git init
git add .
git commit -m "feat: create typed book catalog"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/booklist.git
git push -u origin main
```

Não envie o arquivo `.env` ao GitHub. O `.gitignore` já o exclui; compartilhe apenas o `.env.example`.
