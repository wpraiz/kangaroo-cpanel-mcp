<p align="center">
  <img src="./banner.png" alt="Kangaroo cPanel MCP — AI-Powered Hosting Management" width="100%">
</p>

<h1 align="center">🦘 Kangaroo cPanel MCP</h1>

<p align="center">
  <strong>Gerencie sua hospedagem Kangaroo Host com IA — direto do seu chatbot favorito.</strong><br>
  <em>Só roda o setup, cola a config, e pronto. Zero cPanel manual.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-purple?style=for-the-badge" alt="MCP">
  <img src="https://img.shields.io/badge/cPanel-UAPI-orange?style=for-the-badge" alt="cPanel UAPI">
  <img src="https://img.shields.io/badge/Kangaroo_Host-Partner-green?style=for-the-badge" alt="Kangaroo Host">
</p>

---

## ⚡ TL;DR — 2 passos e pronto

```bash
# 1. Roda o setup (só precisa de usuário e senha do cPanel)
npx kangaroo-cpanel-mcp-setup
# ou
node setup.mjs

# 2. Cola o JSON gerado no seu chatbot/IDE e seja feliz 🎉
```

**Só isso.** Sem abrir cPanel, sem gerar token manualmente, sem complicação.

---

## 🚀 Como Funciona

### Passo 1: Rode o setup

```bash
node setup.mjs
```

Ele vai pedir 3 coisas:

| Pergunta | Exemplo | Onde achar |
|---|---|---|
| **Hostname** | `br2.kangaroo.srv.br` | URL do seu cPanel (padrão Kangaroo: `brN.kangaroo.srv.br`) |
| **Usuário** | `meuuser` | Seu login do cPanel |
| **Senha** | `minhasenha` | Sua senha do cPanel |

O script **autentica automaticamente**, gera um API Token, e te entrega a config pronta.

### Passo 2: Copie e cole

O setup gera um JSON assim — **copie e cole** no seu assistente:

```json
{
  "mcpServers": {
    "kangaroo-cpanel": {
      "command": "npx",
      "args": ["-y", "cpanel-mcp"],
      "env": {
        "CPANEL_HOSTNAME": "br2.kangaroo.srv.br",
        "CPANEL_USERNAME": "seu-usuario",
        "CPANEL_API_TOKEN": "TOKEN_GERADO_AUTOMATICAMENTE"
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

**Pronto!** Reinicie o assistente e comece a usar. 🎉

---

## 🤖 O que você pode pedir pro seu chatbot

Depois de configurar, é só conversar:

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

---

## 🛠️ 27 Ferramentas Disponíveis

| Categoria | Ferramentas |
|---|---|
| 📁 **Arquivos** | Listar, navegar diretórios |
| 🗄️ **Banco de Dados** | Criar, listar, deletar MySQL |
| 📧 **Email** | Criar, listar, deletar contas de email |
| 🌐 **Domínios** | Listar domínios e subdomínios |
| ⏰ **Cron Jobs** | Criar, listar, deletar tarefas agendadas |
| 📊 **Sistema** | Uso de disco e estatísticas |
| 💾 **Backups** | Criar e listar backups |
| 🔒 **SSL** | Instalar certificados |
| 🌍 **DNS** | Listar zonas, adicionar/remover registros |
| 📡 **FTP** | Criar/remover contas FTP |

---

## 🔒 Segurança

- ✅ O Token tem acesso apenas à **UAPI** (nível de usuário, não admin)
- ✅ Comunicação via **HTTPS** (porta 2083)
- ✅ Tokens podem ser **revogados** a qualquer momento no cPanel
- ✅ A **senha nunca é salva** — só é usada uma vez pra gerar o token
- ⚠️ **Nunca commite** o `mcp-config.generated.json` — ele está no `.gitignore`

---

## 📦 Modo Linha de Comando (avançado)

Se preferir pular o modo interativo:

```bash
node setup.mjs --hostname br2.kangaroo.srv.br --username meuuser --password minhasenha
```

---

## 🙏 Agradecimentos

<p align="center">
  <strong>Agradecimento especial à <a href="https://kangaroo.host">Kangaroo Host</a> 🦘</strong>
</p>

Este projeto existe graças a **anos de parceria sólida** entre a [Kangaroo Host](https://kangaroo.host) e o [WPRaiz](https://wpraiz.com.br).

Desde os primeiros projetos WordPress até a evolução para plataformas com IA, a Kangaroo sempre esteve presente — com serviço estável, suporte humano de verdade, e infraestrutura que acompanha o crescimento sem burocracias.

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
