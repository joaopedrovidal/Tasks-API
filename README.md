# 📌 CRUD de Tarefas — API Node.js

Uma API simples construída em **Node.js** para gerenciar tarefas, aplicando conceitos de **CRUD**, manipulação de arquivos, Streams e importação de dados via **CSV**.

O projeto segue o desafio proposto no módulo de Node.js, utilizando rotas HTTP nativas e persistência de dados em arquivos JSON.

---

## 📂 Estrutura de uma Tarefa

Cada tarefa possui a seguinte estrutura:

```json
{
  "id": "uuid-gerado",
  "title": "Título da tarefa",
  "description": "Descrição detalhada",
  "completed_at": null,
  "created_at": "data",
  "updated_at": "data"
}
```

---

## 🚀 Rotas da Aplicação

### ➕ **POST /tasks**

Cria uma nova tarefa.

- **Body esperado:**
  ```json
  {
    "title": "Título da tarefa",
    "description": "Descrição da tarefa"
  }
  ```

- Campos automáticos:  
  `id`, `created_at`, `updated_at`, `completed_at`.

---

### 📄 **GET /tasks**

Lista todas as tarefas cadastradas.

- Permite filtrar por:
  - `title`
  - `description`

Exemplo:  
`GET /tasks?title=Task&description=importante`

---

### ✏️ **PUT /tasks/:id**

Atualiza uma tarefa existente.

- Aceita `title` e/ou `description` no corpo.
- Antes de atualizar, valida se o `id` existe.

---

### 🗑️ **DELETE /tasks/:id**

Remove uma tarefa.

- Antes de remover, valida se o `id` existe.

---

### 🔁 **PATCH /tasks/:id/complete**

Alterna o status de conclusão da tarefa.

- Se `completed_at` for `null`, define a data atual.
- Se já estiver concluída, define `completed_at` como `null`.
- Antes de alterar, valida se o `id` existe.

---

## 📥 Importação de CSV

A importação de tarefas via CSV é feita por meio de um script separado:  
`utils/import-csv.js`.

### 📚 Biblioteca utilizada
- `csv-parse` (Modo Iterator Async)

### 📝 Formato recomendado do CSV

```
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```

### 🔧 Funcionamento do script

O script:

1. Lê o CSV linha por linha (ignorando o cabeçalho).
2. Para cada linha, envia uma requisição **POST /tasks** para inserir os dados.

Execute o script dentro da pasta `utils`:

```bash
node import-csv.js
```

---

## 🛠️ Validações Extras

- Verificação se `title` e `description` estão presentes no corpo das rotas **POST** e **PUT**.
- Mensagens de erro claras caso o `id` informado não exista no banco de dados.

---

## ▶️ Como baixar e rodar o projeto

Siga o passo a passo:

1. Clone o repositório
   ```bash
   git clone https://github.com/joaopedrovidal/CRUD-tarefas.git
   ```

2. Abra o projeto em sua IDE.

3. Em um terminal, instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

5. Em outro terminal, vá até a pasta **utils**:
   ```bash
   cd utils
   ```

6. Execute o importador do CSV:
   ```bash
   node import-csv.js
   ```

7. Agora você pode consumir todas as rotas da API via Insomnia, Postman ou outro cliente HTTP.

---

## 🧑‍💻 Tecnologias Utilizadas

- Node.js
- HTTP nativo
- csv-parse
- File System (fs)
- JavaScript (ES Modules)

---

## Autor
### 👤 João Pedro Vidal

- Linkedin: [@joaopedrovidal](https://www.linkedin.com/in/jo%C3%A3opedrovidaldossantos/)
- Github: [@joaopedrovidal](https://github.com/joaopedrovidal)

---
## 📝 Licença
Copyright © 2025 [@joaopedrovidal]

---

### Desenvolvido 💜 by João Pedro Vidal
