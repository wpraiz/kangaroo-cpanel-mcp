<p align="center">
  <img src="./banner.png" alt="Kangaroo cPanel MCP — AI-Powered Hosting Management" width="100%">
</p>

<h1 align="center">🦘 Kangaroo cPanel MCP</h1>

<p align="center">
  <strong>Gerencie sua hospedagem Kangaroo Host com IA — direto do seu chatbot favorito.</strong><br>
  <em>Um comando. Sem abrir cPanel. Sem complicação.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-purple?style=for-the-badge" alt="MCP">
  <img src="https://img.shields.io/badge/cPanel-UAPI-orange?style=for-the-badge" alt="cPanel UAPI">
  <img src="https://img.shields.io/badge/Kangaroo_Host-Partner-green?style=for-the-badge" alt="Kangaroo Host">
  <img src="https://img.shields.io/npm/v/kangaroo-cpanel-mcp?style=for-the-badge&color=red" alt="npm version">
</p>

---

## ⚡ Um comando e pronto

```bash
npx kangaroo-cpanel-mcp
```

Digita seu **usuário**, **senha** e **hostname do cPanel**. O resto é automático:
- ✅ Autentica no cPanel
- ✅ Gera o API Token
- ✅ Imprime o JSON pronto pra colar

**Só copiar e colar no seu chatbot. Fim.** 🎉

---

## 🎬 Como funciona

```
$ npx kangaroo-cpanel-mcp

  ╔══════════════════════════════════════════╗
  ║   🦘 Kangaroo cPanel MCP — Setup         ║
  ╚══════════════════════════════════════════╝

  Hostname do cPanel (ex: br2.kangaroo.srv.br): br2.kangaroo.srv.br
  Usuário do cPanel: meuuser
  Senha do cPanel: ********

  ✅ Conectado! Domínio principal: meusite.com.br
  ✅ Token gerado com sucesso!

  Cola isso no seu assistente IA:

  {
    "mcpServers": {
      "kangaroo-cpanel": {
        "command": "npx",
        "args": ["-y", "cpanel-mcp"],
        "env": {
          "CPANEL_HOSTNAME": "br2.kangaroo.srv.br",
          "CPANEL_USERNAME": "meuuser",
          "CPANEL_API_TOKEN": "TOKEN_GERADO"
        }
      }
    }
  }
```

### Onde colar?

| Assistente | Arquivo de configuração |
|---|---|
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Cursor** | `.cursor/mcp.json` na raiz do projeto |
| **Gemini (Antigravity)** | `~/.gemini/antigravity/mcp_config.json` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |
| **VS Code (Copilot)** | `.vscode/mcp.json` na raiz do projeto |

---

## 🤖 O que você pode pedir pro seu chatbot depois

```
📧 "Crie o email contato@meusite.com.br com 500MB de cota"

🗄️ "Liste todos os bancos de dados MySQL"

📁 "Mostre os arquivos em /public_html/wp-content"

⏰ "Agende um cron pra rodar backup.sh todo dia às 3h"

📊 "Quanto de disco eu tô usando?"

💾 "Faça um backup completo agora"

🌐 "Quais domínios e subdomínios eu tenho?"

🔒 "Instale o SSL no domínio meusite.com.br"
```

**27 ferramentas** disponíveis: arquivos, bancos de dados, email, domínios, cron jobs, backups, SSL, DNS e FTP.

---

## 🔒 Segurança

- ✅ A **senha nunca é salva** — só é usada uma vez pra gerar o token
- ✅ O Token tem acesso apenas à **UAPI** (nível de usuário, não admin)
- ✅ Comunicação via **HTTPS** (porta 2083)
- ✅ Tokens podem ser **revogados** a qualquer momento no cPanel
- ⚠️ Nunca commite seu token em repos públicos — use variáveis de ambiente

---

## 🔧 Modo avançado (sem interação)

```bash
npx kangaroo-cpanel-mcp --hostname br2.kangaroo.srv.br --username meuuser --password minhasenha
```

> 💡 **Padrão Kangaroo Host:** O hostname geralmente é `brN.kangaroo.srv.br` (N = número do servidor).

---

## 🙏 Agradecimentos

<p align="center">
  <strong>Agradecimento especial à <a href="https://kangaroo.host">Kangaroo Host</a> 🦘</strong>
</p>

Este projeto existe graças a **anos de parceria sólida** entre a [Kangaroo Host](https://kangaroo.host) e o [WPRaiz](https://wpraiz.com.br).

Desde os primeiros projetos WordPress até a evolução para plataformas com IA, a Kangaroo sempre esteve presente — com serviço estável, suporte humano de verdade, e infraestrutura que acompanha o crescimento.

### 💜 Agradecimento especial ao **Otávio**

O **Otávio** é referência dentro da Kangaroo. Sempre solícito, sempre resolvendo, sempre entendendo o contexto técnico e humano de cada demanda. Parceria de verdade se constrói com pessoas assim.

> *"A melhor hospedagem não é só a que mantém seu site no ar — é a que cresce junto com você."*
>
> — WPRaiz Team

---

## 📄 Licença

MIT © [WPRaiz](https://wpraiz.com.br)

---

<p align="center">
  Feito com 💜 por <a href="https://wpraiz.com.br">WPRaiz</a> — Transformando WordPress com Inteligência Artificial
</p>
