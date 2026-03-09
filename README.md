<p align="center">
  <img src="./banner.png" alt="Kangaroo cPanel MCP — AI-Powered Hosting Management" width="100%">
</p>

<h1 align="center">🦘 Kangaroo cPanel MCP</h1>

<p align="center">
  <strong>Gerencie sua hospedagem Kangaroo Host com IA — direto do seu assistente favorito.</strong>
</p>

<p align="center">
  <a href="#-início-rápido">Início Rápido</a> •
  <a href="#-ferramentas-disponíveis">Ferramentas</a> •
  <a href="#-como-obter-seu-token">Token</a> •
  <a href="#-configuração">Configuração</a> •
  <a href="#-agradecimentos">Agradecimentos</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-purple?style=for-the-badge" alt="MCP">
  <img src="https://img.shields.io/badge/cPanel-UAPI-orange?style=for-the-badge" alt="cPanel UAPI">
  <img src="https://img.shields.io/badge/Kangaroo_Host-Partner-green?style=for-the-badge" alt="Kangaroo Host">
</p>

---

## 💡 O que é?

Este projeto é um **guia completo e template de configuração** para integrar sua conta [Kangaroo Host](https://kangaroo.host) com assistentes de IA (Claude, Gemini, Cursor, etc.) usando o **Model Context Protocol (MCP)**.

Com **27 ferramentas** disponíveis, você pode gerenciar **arquivos, emails, bancos de dados, domínios, cron jobs, backups, SSL, DNS e FTP** — tudo por linguagem natural, sem abrir o cPanel.

> **Exemplo:** *"Crie um email contato@meusite.com.br com 500MB de cota"* → feito! ✨

---

## 🚀 Início Rápido

Você precisa de apenas **3 informações**:

| # | Informação | Onde encontrar |
|---|---|---|
| 1 | **Base do cPanel** | URL que você usa para acessar o cPanel (ex: `br2.kangaroo.srv.br`) |
| 2 | **Usuário** | Seu login do cPanel |
| 3 | **API Token** | Criado dentro do cPanel ([veja como →](#-como-obter-seu-token)) |

---

## 🔑 Como Obter Seu Token

O token é como uma "chave de acesso" que permite ao MCP se comunicar com seu cPanel de forma segura, sem precisar da sua senha.

### Passo a passo:

**1.** Acesse seu cPanel pela URL padrão da Kangaroo Host:
```
https://br2.kangaroo.srv.br:2083
```
> 💡 **Dica:** A base do cPanel na Kangaroo geralmente segue o padrão `brN.kangaroo.srv.br` (onde N é o número do seu servidor). Você também pode acessar via `https://seudominio.com:2083`.

**2.** Faça login com seu **usuário e senha** do cPanel.

**3.** No painel, vá em:
```
Segurança → Gerenciar Tokens de API
```

**4.** Clique em **"Criar"** (ou "Create"):
- **Nome do token:** `mcp-agent` (sugestão)
- **Expiração:** sem expiração (ou defina uma data se preferir)

**5.** ⚠️ **COPIE O TOKEN IMEDIATAMENTE!**
> O token só aparece **UMA VEZ**. Se perder, revogue e crie outro.

**6.** Pronto! Agora é só [configurar](#-configuração). 🎉

---

## ⚙️ Configuração

### Para qualquer assistente compatível com MCP

Adicione a seguinte entrada na configuração de MCP do seu assistente:

```json
{
  "mcpServers": {
    "kangaroo-cpanel": {
      "command": "npx",
      "args": ["-y", "cpanel-mcp"],
      "env": {
        "CPANEL_HOSTNAME": "br2.kangaroo.srv.br",
        "CPANEL_USERNAME": "seu-usuario-cpanel",
        "CPANEL_API_TOKEN": "SEU_TOKEN_AQUI"
      }
    }
  }
}
```

### Onde fica o arquivo de configuração?

| Assistente | Caminho do arquivo |
|---|---|
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) |
| **Cursor** | `.cursor/mcp.json` na raiz do projeto |
| **Gemini (Antigravity)** | `~/.gemini/antigravity/mcp_config.json` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |
| **VS Code** | `.vscode/mcp.json` na raiz do projeto |

> 💡 **Padrão Kangaroo Host:** O hostname na maioria dos planos segue o formato `brN.kangaroo.srv.br`. Se tiver dúvida, confira na URL do seu cPanel.

---

## 🛠️ Ferramentas Disponíveis

O MCP conecta com o cPanel via **UAPI** e disponibiliza **27 ferramentas**:

### 📁 Gerenciamento de Arquivos
| Ferramenta | Descrição |
|---|---|
| `list_files` | Listar arquivos e diretórios |

### 🗄️ Bancos de Dados
| Ferramenta | Descrição |
|---|---|
| `list_databases` | Listar todos os bancos MySQL |
| `create_database` | Criar novo banco de dados |
| `delete_database` | Remover banco de dados |

### 📧 Email
| Ferramenta | Descrição |
|---|---|
| `list_email_accounts` | Listar contas de email |
| `create_email_account` | Criar nova conta de email |
| `delete_email_account` | Remover conta de email |

### 🌐 Domínios
| Ferramenta | Descrição |
|---|---|
| `list_domains` | Listar domínios e subdomínios |

### ⏰ Cron Jobs
| Ferramenta | Descrição |
|---|---|
| `list_cron_jobs` | Listar tarefas agendadas |
| `add_cron_job` | Criar nova tarefa agendada |
| `delete_cron_job` | Remover tarefa agendada |

### 📊 Sistema
| Ferramenta | Descrição |
|---|---|
| `get_disk_usage` | Ver uso de disco da conta |

### 💾 Backups
| Ferramenta | Descrição |
|---|---|
| `create_backup` | Criar backup completo da conta |
| `list_backups` | Listar backups disponíveis |

### 🔒 SSL, DNS & FTP
| Categoria | Funções |
|---|---|
| **SSL** | Instalar certificados SSL |
| **DNS** | Listar zonas, adicionar/remover registros |
| **FTP** | Criar/remover contas FTP |

---

## 💬 Exemplos de Uso

Depois de configurar, basta pedir ao seu assistente:

```
📧 "Liste todas as contas de email do domínio wpraiz.com.br"

🗄️ "Crie um banco de dados chamado app_production"

📁 "Mostre os arquivos na pasta /public_html/wp-content/plugins"

⏰ "Adicione um cron job para rodar /scripts/backup.sh todo dia às 3h"

📊 "Qual o uso de disco atual da minha conta?"

💾 "Faça um backup completo da conta"

🌐 "Quais domínios e subdomínios eu tenho configurados?"
```

---

## 🔒 Segurança

- ✅ O **API Token** tem acesso apenas à UAPI (nível de usuário), não ao WHM
- ✅ Toda comunicação é feita via **HTTPS** (porta 2083)
- ✅ Tokens podem ser **revogados** a qualquer momento pelo cPanel
- ✅ Recomendamos definir **expiração** no token para maior segurança
- ⚠️ **Nunca compartilhe** seu token em repositórios públicos — use variáveis de ambiente

---

## 📦 Tecnologias

Este projeto utiliza o pacote [`cpanel-mcp`](https://github.com/ringo380/cpanel-mcp) como base — um servidor MCP production-ready para cPanel. Créditos ao [@ringo380](https://github.com/ringo380) pelo excelente trabalho.

**Requisitos:**
- Node.js 18+ instalado
- Conta cPanel com acesso à API (Kangaroo Host suporta nativamente ✅)

---

## 🙏 Agradecimentos

<p align="center">
  <strong>Um agradecimento especial à <a href="https://kangaroo.host">Kangaroo Host</a> 🦘</strong>
</p>

Este projeto existe graças a **anos de parceria sólida** entre a [Kangaroo Host](https://kangaroo.host) e o [WPRaiz](https://wpraiz.com.br).

Desde os primeiros projetos WordPress até a evolução para plataformas com IA, a Kangaroo sempre esteve presente — com um serviço estável, suporte humano de verdade, e uma infraestrutura que acompanha o crescimento sem burocracias.

### 💜 Agradecimento especial ao **Otávio**

Ao longo dessa jornada, o **Otávio** se destacou como um ponto de referência dentro da Kangaroo. Sempre solícito, sempre resolvendo, sempre entendendo o contexto técnico e humano de cada demanda. Parceria de verdade se constrói com pessoas assim.

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
