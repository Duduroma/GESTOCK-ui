import * as esbuild from 'esbuild';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 5173;

// Compila um arquivo TypeScript
async function compileTS(filePath) {
    try {
        const result = await esbuild.build({
            entryPoints: [filePath],
            bundle: false,
            format: 'iife',
            target: 'es2020',
            jsx: 'transform',
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            write: false,
            define: {
                'React': 'window.React',
                'ReactDOM': 'window.ReactDOM'
            }
        });
        return result.outputFiles[0].text;
    } catch (error) {
        console.error('Erro ao compilar:', error);
        return `console.error('Erro de compilação:', ${JSON.stringify(error.message)});`;
    }
}

// Servidor HTTP simples
const server = createServer(async (req, res) => {
    let filePath = join(__dirname, req.url === '/' ? '/index.html' : req.url);
    
    // Remove query string
    filePath = filePath.split('?')[0];
    
    // Segurança: só permite arquivos dentro do diretório do projeto
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    try {
        if (extname(filePath) === '.tsx' || extname(filePath) === '.ts') {
            // Compila TypeScript
            const compiled = await compileTS(filePath);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(compiled);
        } else if (filePath.endsWith('.html')) {
            // Serve HTML
            const html = readFileSync(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } else if (existsSync(filePath)) {
            // Serve outros arquivos estáticos
            const content = readFileSync(filePath);
            res.writeHead(200);
            res.end(content);
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    } catch (error) {
        console.error('Erro:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
