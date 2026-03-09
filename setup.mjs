#!/usr/bin/env node

/**
 * 🦘 Kangaroo cPanel MCP — Setup Automático
 *
 * Gera um API Token no cPanel usando apenas usuário e senha.
 * Sem precisar acessar o painel manualmente!
 *
 * Uso:
 *   node setup.mjs
 *   node setup.mjs --hostname br2.kangaroo.srv.br --username meuuser --password minhasenha
 */

import { createInterface } from "readline";
import https from "https";
import fs from "fs";
import path from "path";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

const COLORS = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    purple: "\x1b[35m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
};

function log(msg, color = "") {
    console.log(`${color}${msg}${COLORS.reset}`);
}

function banner() {
    console.log();
    log("  ╔══════════════════════════════════════════╗", COLORS.purple);
    log("  ║   🦘 Kangaroo cPanel MCP — Setup         ║", COLORS.purple);
    log("  ║   Configuração automática do token        ║", COLORS.purple);
    log("  ╚══════════════════════════════════════════╝", COLORS.purple);
    console.log();
}

function callCpanelApi(hostname, username, password, endpoint) {
    return new Promise((resolve, reject) => {
        const auth = Buffer.from(`${username}:${password}`).toString("base64");
        const url = new URL(`https://${hostname}:2083/execute/${endpoint}`);

        const options = {
            hostname: url.hostname,
            port: 2083,
            path: url.pathname + url.search,
            method: "GET",
            headers: {
                Authorization: `Basic ${auth}`,
            },
            rejectUnauthorized: false,
        };

        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch {
                    reject(new Error(`Resposta inválida do cPanel: ${data.slice(0, 200)}`));
                }
            });
        });

        req.on("error", (err) => reject(err));
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error("Timeout — não foi possível conectar ao cPanel"));
        });
        req.end();
    });
}

async function parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {};
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i]?.replace(/^--/, "");
        const val = args[i + 1];
        if (key && val) parsed[key] = val;
    }
    return parsed;
}

async function main() {
    banner();

    const args = await parseArgs();

    const hostname =
        args.hostname ||
        (await ask(
            `${COLORS.cyan}Hostname do cPanel ${COLORS.dim}(ex: br2.kangaroo.srv.br)${COLORS.reset}: `
        ));

    const username =
        args.username ||
        (await ask(`${COLORS.cyan}Usuário do cPanel${COLORS.reset}: `));

    const password =
        args.password ||
        (await ask(`${COLORS.cyan}Senha do cPanel${COLORS.reset}: `));

    console.log();
    log("  ⏳ Verificando credenciais...", COLORS.yellow);

    // 1. Testar conexão listando domínios
    try {
        const domainsResult = await callCpanelApi(
            hostname,
            username,
            password,
            "DomainInfo/list_domains"
        );

        if (domainsResult.status !== 1) {
            log(
                `  ❌ Falha na autenticação: ${domainsResult.errors?.join(", ") || "credenciais inválidas"}`,
                COLORS.red
            );
            rl.close();
            process.exit(1);
        }

        log(
            `  ✅ Conectado! Domínio principal: ${domainsResult.data.main_domain}`,
            COLORS.green
        );
    } catch (err) {
        log(`  ❌ Erro de conexão: ${err.message}`, COLORS.red);
        rl.close();
        process.exit(1);
    }

    // 2. Checar se já existe um token mcp-agent
    log("  ⏳ Verificando tokens existentes...", COLORS.yellow);
    const tokenName = `mcp-agent-${Date.now()}`;

    try {
        const listResult = await callCpanelApi(
            hostname,
            username,
            password,
            "Tokens/list"
        );

        if (listResult.status === 1 && listResult.data) {
            const existing = listResult.data.find((t) =>
                t.name?.startsWith("mcp-agent")
            );
            if (existing) {
                log(
                    `  ⚠️  Token "${existing.name}" já existe. Criando um novo com nome único.`,
                    COLORS.yellow
                );
            }
        }
    } catch {
        // Ignora — segue criando
    }

    // 3. Criar o token
    log("  ⏳ Gerando API Token...", COLORS.yellow);

    try {
        const tokenResult = await callCpanelApi(
            hostname,
            username,
            password,
            `Tokens/create_full_access?name=${tokenName}`
        );

        if (tokenResult.status !== 1) {
            log(
                `  ❌ Erro ao criar token: ${tokenResult.errors?.join(", ") || "erro desconhecido"}`,
                COLORS.red
            );
            rl.close();
            process.exit(1);
        }

        const token = tokenResult.data.token;
        log(`  ✅ Token gerado com sucesso!`, COLORS.green);
        console.log();

        // 4. Mostrar config pronta
        const config = {
            mcpServers: {
                "kangaroo-cpanel": {
                    command: "npx",
                    args: ["-y", "cpanel-mcp"],
                    env: {
                        CPANEL_HOSTNAME: hostname,
                        CPANEL_USERNAME: username,
                        CPANEL_API_TOKEN: token,
                    },
                },
            },
        };

        log("  ╔══════════════════════════════════════════╗", COLORS.green);
        log("  ║   ✅ Configuração MCP pronta!             ║", COLORS.green);
        log("  ╚══════════════════════════════════════════╝", COLORS.green);
        console.log();
        log("  Adicione ao seu arquivo de configuração MCP:", COLORS.cyan);
        console.log();
        console.log(JSON.stringify(config, null, 2));
        console.log();

        // 5. Salvar em arquivo local
        const outputPath = path.join(process.cwd(), "mcp-config.generated.json");
        fs.writeFileSync(outputPath, JSON.stringify(config, null, 2) + "\n");
        log(`  💾 Salvo em: ${outputPath}`, COLORS.dim);
        console.log();

        log("  📋 Caminhos dos arquivos de config por assistente:", COLORS.cyan);
        log(
            "     Claude Desktop : ~/Library/Application Support/Claude/claude_desktop_config.json",
            COLORS.dim
        );
        log("     Cursor         : .cursor/mcp.json", COLORS.dim);
        log(
            "     Gemini         : ~/.gemini/antigravity/mcp_config.json",
            COLORS.dim
        );
        log("     Windsurf       : ~/.codeium/windsurf/mcp_config.json", COLORS.dim);
        log("     VS Code        : .vscode/mcp.json", COLORS.dim);
        console.log();

        log(
            `  🔑 Token name: "${tokenName}" — revogue no cPanel se necessário`,
            COLORS.dim
        );
        console.log();
    } catch (err) {
        log(`  ❌ Erro: ${err.message}`, COLORS.red);
        rl.close();
        process.exit(1);
    }

    rl.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
