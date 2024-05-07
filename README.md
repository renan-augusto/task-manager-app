# Task manager app - Gerenciador de tarefas
## Sobre o projeto
O projeto propõe-se a criar um gerenciador de tarefas onde os usuários podem criar e gerenciar suas tarefas de forma simples e intuitiva.

## Tecnologias utilizadas
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **NestJs**: Framework para Node.js que facilita a criação da lógica dos servidores.
- **Postgre**: Sistema de gerenciamento de banco de dados relacional.
- **Angular 17**: Framework de desenvolvimento front-end de aplicativos da web.
- **PO UI**: Biblioteca de componentes baseado em Angular.
- **Docker**: Facilita a criação, execução e implantação de aplicações em ambientes isolados

## Estrutura de Pastas:

### task-manager (Aplicação back-end)
  - **/src**: Código-fonte principal da aplicação do lado do servidor
    - **/auth**: Contém controller, modulo e service de autenticação
      - **/dto**: Contém objetos de transferência de dados.
      - **/guard**: Contém guardas de rotas que controlam o acesso às rotas com base na autenticação do usuário.
      - **/strategy**: Contém estratégias de autenticação utilizadas pela aplicação.
    - **/interfaces**: Contém interfaces que definem contratos para diferente partes do código.
    - **/menu**: Contém controller, modulo e service para o fornecimento dos menus da aplicação.
    - **/prisma**: Contém a service da ORM prisma
    - **/task**: Contém controller, modulo e service para a criação e fornecimento das tasks.
      - **/dto**: Contém os objetos de transferência de dados referentes as tasks.

### task-manager-ui
  - **/src**: Código-fonte principal da aplicação front-end.
    - **/app**
      - **/core**: Contém as services
      - **/guards**
      - **/interceptors**
      - **/models**: Contém as interfaces de contrato para uso em toda a aplicação front-end.
      - **/pages**: Contém as páginas que serão renderizadas nas rotas da aplicação. 
        - **/login**: Contém a página de login.
        - **/pages**: Contém páginas que serão colocadas com rotas filhas da main-layout
          - **/home**
          - **/task**
        - **/shared**: Contém componentes compartilhados que podem ser utilizados por toda a aplicação front-end
          - **/load**
          - **/mainlayout**: Contém o componente mainlayout que criará um layout para aplicação quando o usuário estiver logado
          - **/menu**
          - **/modals**: Contém modais que serão utilizados por toda a aplicação.
            - **/create-task**
            - **/create-user**
      - **/assets**
      - **/environments**

## Rodando localmente:
- Certifique-se de que possua o docker instalado em sua máquina.
- Navegue, via prompt de comando, até a pasta raiz do projeto /task-manager-app
- Execute o comando `docker compose-up`
- A interface gráfica da aplicação estará rodando em http://localhost:4200/

## Funcionalidades:
- **Cadastro de usuário**: É possível se cadastrar para ter acesso a aplicação.
- **Autenticação de usuário**: Autentica o usuário de acordo com o cadastro.
- **Navegação via menus**: É possível navegar por diferentes rotas via menu.
- **Criar tasks**: Possibilita a criação de tasks.
- **Visualização de tasks criadas**: Permite a visualização das tasks do usuário logado.

