# COGNVOX

Projeto fullstack composto por:

* **Banco de dados**: MySQL (Docker)
* **Back-end**: Python + Flask
* **Front-end**: React

Este README descreve **passo a passo**, via **terminal**, como instalar, configurar e rodar todo o projeto do zero em **Linux** e **Windows**, além de popular o banco com dados iniciais para testes.

---

## 1. Pré-requisitos

### Linux

* Docker
* Docker Compose (ou docker compose)
* Python **3.10+**
* Node.js **18+**
* npm ou yarn

### Windows

* Docker Desktop (com WSL2 habilitado)
* Python **3.10+** (marcar "Add Python to PATH")
* Node.js **18+**
* npm ou yarn

Verifique as versões:

```bash
python --version
node --version
docker --version
```

---

## 2. Subindo o MySQL com Docker

### 2.1 Criar o container MySQL

No terminal:

```bash
docker run -d \
  --name mysql1 \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql:8.0
```

> O banco ficará acessível em `127.0.0.1:3306` com usuário `root` e senha `root`.

Verifique se está rodando:

```bash
docker ps
```

---

## 3. Criando o banco e as tabelas

Entre no container:

```bash
docker exec -it mysql1 mysql -u root -p
```

Senha: `root`

Execute o script abaixo:

```sql
CREATE DATABASE IF NOT EXISTS cognvox;
USE cognvox;

CREATE TABLE ator (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  email VARCHAR(255),
  profissao VARCHAR(100),
  sessao_ano INT,
  inicio_intervencao DATE,
  modalidade_ensino VARCHAR(100),
  idioma VARCHAR(50),
  instituicao VARCHAR(255),
  endereco VARCHAR(255),
  cidade VARCHAR(100),
  estado VARCHAR(50),
  pais VARCHAR(50),
  usuario VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  grupo_acesso VARCHAR(50) NOT NULL,
  foto VARCHAR(255),
  status VARCHAR(30) NOT NULL
);
```

---

## 4. Inserindo dados de exemplo (seed)

Ainda no MySQL:

```sql
INSERT INTO ator (
  nome,
  data_nascimento,
  email,
  profissao,
  sessao_ano,
  inicio_intervencao,
  modalidade_ensino,
  idioma,
  instituicao,
  endereco,
  cidade,
  estado,
  pais,
  usuario,
  senha_hash,
  grupo_acesso,
  foto,
  status
) VALUES (
  'Maria Silva',
  '1995-06-15',
  'maria@teste.com',
  'Professora',
  2024,
  '2024-03-01',
  'Presencial',
  'Português',
  'Instituto Exemplo',
  'Rua das Flores, 123',
  'Recife',
  'PE',
  'Brasil',
  'maria.silva',
  'scrypt:32768:8:1$BcaQIWwX3rJucXhc$a6e48696a04a2fa57067534b999d2b6b4973e69742b2a5c58f3f5ac4bb84f026e6fd1a2918ae1d718e792fa48be5873023884a18fae2f6e7c028696123849bc5',
  'admin',
  NULL,
  'ativo'
);
```

> ⚠️ O campo `senha_hash` sera gerado pelo Flask usando `generate_password_hash`.

Saia do MySQL:

```sql
exit;
```

---

## 5. Back-end (Flask)

### 5.1 Instalar dependências

```bash
pip install flask flask_sqlalchemy flask_cors werkzeug pymysql
```

---

### 5.3 Inicialização do Back


```bash
python app.py
```

O back-end ficará disponível em:

```
http://localhost:5000
```

---

## 6. Front-end (React)

Entre na pasta do front:

```bash
cd front
```

Instale as dependências:

```bash
yarn
```
ou
```bash
npm install
```

Rodar o projeto:

```bash
npm run start
```
ou
```bash
yarn start
```

O front-end ficará disponível em uma URL exibida no terminal

---
## 7. Utilizando a aplicação

### o login e senha para acessar o site sera o mesmo que adicionamos anteriormente no banco
### usuario: `maria.silva`

### senha: `123456`
---
