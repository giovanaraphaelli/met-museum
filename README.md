# MET Museum

Projeto experimental desenvolvido para estudo e prática de Next.js 13+, integrando a API pública do The Metropolitan Museum of Art.

![Resultado final do projeto](./public/met-museum.gif)

<h4 align="center"><a target="_blank" href="https://met-museum.giovanaraphaelli.tech">Clique para visitar o projeto</a></h4>

---

## ✨ Funcionalidades

- **Art of the Day**: Exibe uma obra de arte aleatória do acervo do museu, acompanhada de um carrossel com as imagens disponíveis da obra.
- **Pesquisa**: Permite buscar por obras de arte utilizando palavras-chave específicas.
- **Listagem por Departamento**: Lista as obras de arte disponíveis em cada departamento.
- **Detalhes de Obras**: Exibe informações detalhadas de cada obra, incluindo descrição, autor, data e materiais utilizados.
- **Paginação**: Navegação otimizada entre as páginas de resultados.
- **Carregamento Inteligente**: Utilização de SSR, SSG e Suspense para melhorar o desempenho e a experiência do usuário.
- **Responsividade**: Layout adaptável para diferentes tamanhos de tela.

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, pude explorar alguns conceitos:

- **Server Components e Client Components**: Compreensão para otimização de desempenho.
- **Rotas Dinâmicas**: Configuração e gerenciamento de parâmetros dinâmicos na URL.
- **Fetch e Cache**: Uso de APIs REST e técnicas de caching para otimização.
- **Form Action**: Implementação de ações baseadas em formulários para pesquisa e navegação.
- **Gerenciamento de Estado e Navegação**: Utilização de hooks como `useSearchParams` e `useRouter`.
- **SSR, SSG e Suspense**: Integração e uso de diferentes métodos de renderização para melhorar a experiência do usuário e o desempenho.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15**: Framework React para construção de aplicações web modernas com suporte a Server-Side Rendering (SSR) e Static Site Generation (SSG).
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, proporcionando maior confiabilidade no desenvolvimento.
- **Tailwind CSS**: Framework CSS utilitário para criação de layouts responsivos e personalizados.
- **ShadCN UI**: Conjunto de componentes estilizados e acessíveis, integrando Radix e Tailwind.

---

## 📝 Observações

- Este projeto utiliza a API pública do <a href="https://metmuseum.github.io/#search" target="_blank">The Metropolitan Museum of Art</a> para acessar dados sobre as obras de arte.
- Algumas limitações de dados podem ocorrer devido à natureza da API pública.
