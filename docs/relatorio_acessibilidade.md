Relatório de Acessibilidade — Projeto Livraria

Resumo das mudanças
- Adicionado `LiveAnnouncer` (região aria-live) em `src/components/LiveAnnouncer.jsx` e montado no root do app.
- Inseridos títulos escondidos (`sr-only` H1) nas seções de catálogo e carrinho para melhorar a navegação por leitores de tela.
- Chamadas a `announce(message)` foram adicionadas em ações-chave:
  - Ao adicionar produto ao carrinho
  - Ao mover favorito para o carrinho
  - Ao incrementar quantidade no carrinho
- Pequenos ajustes visuais/caso vazio das Favoritas e ajustes no banner/carousel (object-fit / object-position).

Nota sobre ferramentas automatizadas removidas

As referências, scripts e configurações automáticas do Lighthouse foram removidas deste repositório conforme solicitado. Caso seja necessário no futuro, esses workflows ou scripts podem ser re-adicionados mediante solicitação.

As instruções abaixo mantêm os passos manuais para testes com leitores de tela e verificações manuais no navegador.

O que você pode fazer para obter uma execução limpa (sugestões)

- Fechar todas as janelas do navegador antes de testar manualmente.
- Abrir manualmente o navegador e navegar para http://127.0.0.1:8080/ para verificar avisos/prompt (boas-vindas, certificados, extensões que bloqueiam). Resolva ou ignore esses prompts antes de testar.
- Para automação futura, considere usar um perfil limpo (user-data-dir) ou um binário de Chrome/Chromium dedicado — é possível reconfigurar e adicionar scripts para reintroduzir execuções automatizadas.

Instruções para testes manuais com NVDA (Windows)
1. Inicie o servidor (produção/local) se não estiver rodando:
  - Abra PowerShell na raiz do projeto e rode:
    ```powershell
    npm run build
    npm start
    ```
  - Confirme que o app está em http://127.0.0.1:8080/
2. Abra o navegador Chrome (ou Edge Chromium) e navegue até http://127.0.0.1:8080/.
3. Inicie o NVDA (simplesmente pressione Ctrl+Alt+N se tiver o atalho configurado ou abra pelo menu Iniciar).
4. Ações a executar e o que gravar (transcrição ou gravação de áudio):
   - Adicionar um produto ao carrinho (no ProductList): esperar pela mensagem anunciada. Copie a fala/transcrição (ex.: "Produto X adicionado ao carrinho").
   - Mover um favorito para o carrinho (Favorites): esperar pela mensagem anunciada.
   - Aumentar quantidade no carrinho (botão +): esperar pela mensagem anunciada.
   - Navegar pelas seções (usar H para listar headings no NVDA) e verificar a presença dos H1 escondidos (eles não são visíveis mas devem aparecer no leitor de estrutura/heading list).
5. Salve as transcrições (cole no arquivo abaixo) ou grave um pequeno áudio/vídeo para anexar.

Template para colar transcrições NVDA
- Teste: Adicionar produto ao carrinho
  - Ação realizada: (ex.: foco no botão "Adicionar" do produto "X")
  - NVDA output (transcrição):


- Teste: Mover favorito para o carrinho
  - Ação realizada:
  - NVDA output (transcrição):


- Teste: Incrementar quantidade no carrinho
  - Ação realizada:
  - NVDA output (transcrição):


Observações técnicas e próximas etapas possíveis
Próximas ações possíveis:
  - Preparar um arquivo final `docs/relatorio_acessibilidade_final.md` combinando transcrições NVDA e quaisquer relatórios manuais anexados.
  - Configurar execuções automatizadas no futuro (com perfil dedicado ou apontando para um binário de Chrome/Chromium específico) para reintroduzir auditorias automatizadas.
  - Ajudar a interpretar relatórios gerados por ferramentas de auditoria (sumarizar Accessibility, Best Practices, SEO, Performance, PWA) — informe qual fonte deve ser utilizada.

Se precisar que eu tente mais uma reexecução automática agora, diga qual abordagem prefere:
 - (A) Tentar com `--chrome-path` apontando para um Chrome específico (informe o caminho do executável),
 - (B) Tentar novamente após fechar todas as instâncias do Chrome,
 - (C) Parar aqui e gerar o relatório final inicial usando os HTML/JSON existentes e o template acima.


