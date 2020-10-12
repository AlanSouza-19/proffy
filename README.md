# Página inicial da aplicação
![alt text](https://github.com/AlanSouza-19/proffy/blob/master/github-images/landing-page.png)

# Página em que os professores se cadastram para dar aulas
![alt text](https://github.com/AlanSouza-19/proffy/blob/master/github-images/page-give-classes.png)

# Página que aparece quando o cadastro do professor é realizado com sucesso
![alt text](https://github.com/AlanSouza-19/proffy/blob/master/github-images/page-success.png)

# Página em que os alunos procuram os professores
![alt text](https://github.com/AlanSouza-19/proffy/blob/master/github-images/page-study.png)


## como testar a aplicação
rode o comando abaixo no terminal para clonar o repositório (caso já tiver o git instalado):
```
git clone https://github.com/AlanSouza-19/proffy.git
```
Caso não tenha o git instalado, pode baixar o zip diretamente do github.

Logo após, abra o teminal no diretório do projeto e execute:
```
npm install
```
Esse comando irá instalar todas as dependências do projeto.
Em seguida, execute o comando abaixo para gerar as tabelas do banco de dados:
```
node src/database/db.js
```
Feito isso, basta executar o comando
```
npm run dev
```
e acessar o endereço http://localhost:5500 no seu navegor.


#### Obrigado e qualquer contribuição é bem vinda.
