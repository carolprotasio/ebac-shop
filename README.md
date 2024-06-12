# Projeto EBAC-SHOP

"Loja EBAC" é uma plataforma de comércio eletrônico desenvolvida para servir como ambiente de testes para práticas de qualidade de software. Ele permite a validação de diversas funcionalidades comuns em lojas online, como adição de produtos ao carrinho, fluxo de compras, avaliações de produtos, e gerenciamento de wishlist. O objetivo principal é fornecer um ambiente controlado onde profissionais de QA (Quality Assurance) podem aplicar e testar suas habilidades usando diferentes técnicas e ferramentas.

No projeto [EBAC Shop](http://lojaebac.ebaconline.art.br/) foi utilizado o Cypress, um framework de testes end-to-end para garantir que todas as funcionalidades do site estejam funcionando corretamente.

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/lojaEbac.png)

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor, utilizada para configurar o ambiente de testes e automatização.
- **JavaScript**: Linguagem de programação utilizada para escrever os testes e scripts de automação.
- **Cypress**: Ferramenta de testes end-to-end que facilita a escrita e execução de testes automatizados em navegadores web.
- **Faker**: Biblioteca que gera dados falsos para uso em testes, como nomes, endereços e números de telefone, garantindo variabilidade nos testes.
- **Git**: Sistema de controle de versão distribuído, utilizado para versionamento do código-fonte e colaboração entre os desenvolvedores.


## Estrutura do Projeto

O projeto está estruturado em diferentes diretórios, cada um representando uma área específica dos testes:

- **e2e**: Contém os testes end-to-end que cobrem diferentes funcionalidades e elementos do site.
- **fixtures**: Armazena os dados fictícios gerados pelo Faker para serem usados nos testes.
- **support**: Contém arquivos de suporte, como comandos personalizados do Cypress e utilitários de configuração.

# Funcionalidades Testadas

| Funcionalidade | Descrição |
| -------------- | --------- |
| `Produtos` |
| Adicionar 1 produto ao carrinho com sucesso | Teste para verificar se é possível adicionar um produto ao carrinho com sucesso. |
| Adicionar vários produtos ao carrinho com sucesso | Teste para verificar se é possível adicionar vários produtos ao carrinho com sucesso. |
| Adicionar 3 itens do mesmo produto ao carrinho | Teste para verificar se é possível adicionar 3 itens do mesmo produto ao carrinho. |
| Adicionar 3 itens ao carrinho e o valor total dever ser igual a soma total dos 3 itens | Teste para garantir que o valor total no carrinho seja a soma dos valores dos 3 itens adicionados. |
| Quantidade de itens no carrinho deve ser igual à quantidade na barra de navegação | Teste para verificar se a quantidade de itens no carrinho corresponde à quantidade exibida na barra de navegação. |
| Deve avaliar o produto com sucesso | Teste para garantir que um produto pode ser avaliado com sucesso. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/sec-produto.png)


| Funcionalidade | Descrição |
| -------------- | --------- |
| `Carrinho de Compra e seu Fluxo` |
| Adicionar 3 itens ao carrinho e o valor total dever ser igual a soma total dos 3 itens | Teste para garantir que o valor total no carrinho seja a soma dos valores dos 3 itens adicionados. |
| Deletar produtos do carrinho | Teste para remover os produtos do carrinho |
| Adicionar 1 item de um produto adicionado no carrinho | Teste para verificar se é possível adicionar mais um item de um produto já adicionado no carrinho. |
| Deve remover o produto do carrinho depois de adicionado na tela do carrinho | Teste para garantir que o produto pode ser removido do carrinho na tela do carrinho. |
| Estando o carrinho vazio deve mostrar aviso na navegação e tela do carrinho | Teste para verificar se um aviso é exibido quando o carrinho está vazio, tanto na navegação quanto na tela do carrinho. |
| Adicionar cupom inválido deve receber mensagem de erro | Teste para verificar se uma mensagem de erro é exibida ao adicionar um cupom inválido. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/sec-carrinho.png)

| Funcionalidade | Descrição |
| -------------- | --------- |
| `Realizar Checkout das Compras` |
| Deve realizar o checkout: Método de Pagamento => Transferência Bancária | Teste para garantir que o checkout pode ser realizado com o método de pagamento por transferência bancária. |
| Deve realizar o checkout: Método de Pagamento => Cheque | Teste para garantir que o checkout pode ser realizado com o método de pagamento por cheque. |
| Deve realizar o checkout: Método de Pagamento => Pagamento na Entrega | Teste para garantir que o checkout pode ser realizado com o método de pagamento na entrega. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/sec-checkout.png)

| Funcionalidade | Descrição |
| -------------- | --------- |
| `Minha-conta` |
| Preencher com dados válidos e salvar | Teste para garantir que o usuário possa preencher os detalhes da conta com dados válidos e salvar com sucesso. |
| Mudar a senha com sucesso | Teste para garantir que o usuário possa alterar sua senha com sucesso, seguindo o fluxo de mudança de senha. |
| Alterar/cadastrar o Endereço de Faturamento com sucesso | Teste para garantir que o usuário possa alterar ou cadastrar o endereço de faturamento com sucesso, seguindo o fluxo correspondente. |
| Alterar/cadastrar o Endereço de Entrega com sucesso | Teste para garantir que o usuário possa alterar ou cadastrar o endereço de entrega com sucesso, seguindo o fluxo correspondente. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/sec-minha.png)

| Funcionalidade | Descrição |
| -------------- | --------- |
| `Nav-bar` |
| Buscar um item específico na busca | Teste para garantir que o usuário logado possa buscar um item específico usando a funcionalidade de busca na barra de navegação, e que a busca falhe corretamente caso o item não seja encontrado. |
| Selecionar "home-3" na barra de navegação | Teste para garantir que o usuário logado possa selecionar a opção "home-3" na barra de navegação e seja direcionado corretamente para a página correspondente. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/sec-navbar.png)

| Funcionalidade | Descrição |
| -------------- | --------- |
| `Wishlist` |
| Deve salvar um produto no Wishlist com sucesso | Teste para verificar se é possível salvar um produto na Wishlist com sucesso. |
| Deve adicionar 5 itens na Wishlist com sucesso | Teste para verificar se é possível adicionar 5 itens na Wishlist com sucesso. |
| Deve apagar toda lista da Wishlist com sucesso | Teste para garantir que é possível apagar toda a lista da Wishlist com sucesso. |

![Loja Ebac](https://github.com/carolprotasio/ebac-shop/blob/main/cypress/e2e/assets/wishlist.png)

## Como Executar o Projeto
Para executar o projeto localmente, siga os passos abaixo:

1. **Pré-requisitos:**
   - Node.js instalado na sua máquina.
   - Git instalado na sua máquina.

2. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git

3. **Instale as dependências:**
    ```bash
   npm install

4. **Execute os testes no modo interativo:**
    ```bash
   npm run cy:open
5. **Ou execute os testes em modo headless:**
    ```bash
   npm run cy:run
---
 # Conclusão do Projeto
Este projeto ofereceu uma base sólida para o aprendizado e a prática de testes automatizados com o Cypress, contribuindo significativamente para a melhoria das habilidades de testes automatizados e os estudos sobre a garantia da qualidade do software.