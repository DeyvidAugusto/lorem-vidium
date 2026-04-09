# Lorem Vidium

## Descrição

Lorem Vidium é um catálogo interativo de filmes e séries, desenvolvido como um site web estático. O projeto utiliza a API do The Movie Database (TMDB) para buscar e exibir informações sobre filmes e séries populares, permitindo aos usuários navegar, buscar e explorar conteúdo audiovisual.

## Funcionalidades

- **Catálogo de Filmes**: Exibe filmes populares e bem avaliados.
- **Catálogo de Séries**: Páginas dedicadas para explorar séries.
- **Busca**: Funcionalidade de pesquisa para encontrar filmes e séries específicos.
- **Sistema de Contas**: Registro e login de usuários (dados armazenados localmente em db.json).
- **Páginas Detalhadas**: Informações sobre filmes e séries individuais.
- **Interface Responsiva**: Design adaptável para diferentes dispositivos.

## Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas web.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript (ES6+)**: Lógica do lado cliente, manipulação do DOM e integração com API.
- **API do TMDB**: Fonte de dados para filmes e séries.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/lorem-vidium.git
   ```
2. Navegue até o diretório do projeto:
   ```
   cd lorem-vidium
   ```
3. Abra o arquivo `index.html` em um navegador web moderno.

**Nota**: Não há dependências externas ou servidor necessário, pois é um site estático. Certifique-se de ter uma conexão com a internet para carregar dados da API do TMDB.

## Como Usar

1. **Homepage**: Acesse `homepage.html` para começar. Aqui você pode se registrar ou fazer login.
2. **Navegação**: Use os links para acessar páginas de filmes (`movies-page.html`), séries (`series-page.html`) ou resultados de busca (`results.html`).
3. **Busca**: Utilize a funcionalidade de busca integrada para encontrar conteúdo específico.
4. **Detalhes**: Clique em itens para ver mais informações em páginas como `about.html` ou `about-serie.html`.

## Estrutura do Projeto

```
lorem-vidium/
├── index.html                 # Página inicial
├── homepage.html              # Landing page
├── login.html                 # Página de login
├── register.html              # Página de registro
├── movies-page.html           # Página de filmes
├── series-page.html           # Página de séries
├── results.html               # Página de resultados de busca
├── about.html                 # Página sobre filme
├── about-serie.html           # Página sobre série
├── account.html               # Página da conta do usuário
├── db/
│   └── db.json                # Dados mock de usuários
├── scripts/
│   ├── index.js               # Script principal
│   ├── login.js               # Lógica de login
│   ├── register.js            # Lógica de registro
│   ├── script-movies.js       # Scripts para página de filmes
│   ├── script-series.js       # Scripts para página de séries
│   ├── search.js              # Funcionalidade de busca
│   ├── results.js             # Lógica para resultados
│   ├── about.js               # Scripts para página sobre
│   └── about-serie.js         # Scripts para página sobre série
└── src/
    ├── img/                   # Imagens do projeto
    └── styles/
        ├── style.css          # Estilo principal
        ├── homepage.css       # Estilos da homepage
        ├── register.css       # Estilos da página de registro
        ├── results.css        # Estilos da página de resultados
        ├── about.css          # Estilos da página sobre
        └── ...                # Outros estilos
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs ou sugerir melhorias abrindo uma issue.
- Enviar pull requests com correções ou novas funcionalidades.

Antes de contribuir, por favor, revise as issues existentes e siga as melhores práticas de desenvolvimento web.

## Autores

- Deyvid Augusto
- [Daniel Pimenta](https://github.com/DanielFigues)
