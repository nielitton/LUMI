# Guia de instalação do projeto -Lumi-

Para podermos começar, certifique-se de ter instalado em sua maquina os seguintes itens
- node (https://nodejs.org/en)
- npm (normalmente já vem instalado no node)
- Docker (https://docs.docker.com/get-docker/)

Com isso certificado, podemos começar

## Clone o repositório do projeto

```bash
git clone git@github.com:nielitton/LUMI.git
```
1. **Entrando na pasta do projeto**

Vamos entrar na pasta do projeto com o comando
```bash
cd LUMI
```

## Vamos iniciar o backend do projeto

1. **Iniciando projeto backend**

Já dentro da pasta do projeto, você precisara entrar mais uma camada no projeto
```bash
cd lumi-backend
```

2. **Após isso, precisamos instalar as dependências do projeto**

Com o comando 
```bash
npm install
```

**Após as dependências instaladas**

3. **Precisamos gerar o database das faturas**

Para fazer isso, digite o seguinte comando
```bash
npx prisma migrate dev --name first
```

Após isso certifique-se de gerar o prisma
```bash
npx prisma generate
```

4. **Após o prisma gerado**

Após isso, será necessário criar um container no docker, é muito simples, em seu terminal digite o seguinte
```bash
docker run --name lumi -e POSTGRES_USER=lumi -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=lumi -p 5432:5432 -d postgres
```

Certifique-se de que o seu container está rodando, com o comando
```bash
docker ps
```

5. **Após iniciar o container**

- Após iniciar o container, precisamos criar um arquivo .env, dentro da nossa pasta lumi-backend.
- Com esse aquivo criado, cole o seguinte código dentro dele.
```bash
DATABASE_URL="postgresql://lumi:1234@localhost:5432/lumi?schema=public"
APP_PORT=3333
AWS_ACCESS_KEY_ID="AKIAVRUVPMVRXZZDGHMZ"
AWS_SECRET_ACCESS_KEY="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"
AWS_REGION="us-east-2"
S3_BUCKET_NAME="lumibucketteste"
```

Isso irá lhe fornecer as variáveis de ambiente necessárias para iniciar a nossa API.

6. **Com todos os passos feitos**

Com todos os passos feitos, você poderá iniciar a API. Com o comando
```bash
npm run start:dev
```

7. **Os endpoints da aplicação são**

- GET: pdf/<NÚMERODOPDF> - Headers: 'Content-Type': 'application/pdf'
- GET: /invoices - (você poderá pesquisar as faturas por númeri di cliente assim -> /invoices?clientNumber=<número>)
- POST: /pdf-extractor/extract -(Você deverá enviar um arquivo PDF para este endpoint)

## Iniciar o projeto no front-end

1. **Para iniciar o projeto no front end**

Para iniciar o frontEnd, será necessário entrar no projeto do front, no seu terminal digite.

```bash
cd lumi-front
```

2. **Instalando as dependências**

Depois de estar no projeto do front, vamos instalar as nossas dependências

```bash
npm install
```

3. **Com todas as nossas dependências instaladas**

Depois de instalar todas as nossas dependências, vamos iniciar o front

```bash
npm run dev
```

Isso iniciará o nosso projeto, no seu terminal terá o endereço/link de onde você pode estar acessando o nosso projeto.

ou você pode copiar a seguir

```bash
http://localhost:3000
```