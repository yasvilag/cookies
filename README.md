# 🍪 Exemplo Didático de Cookies - Modo Claro/Escuro

Um projeto educativo completo que demonstra como usar **cookies** em JavaScript para personalizar a interface do usuário com alternância entre modo claro e escuro.

## 📂 Estrutura do Projeto

```
cookies_yasmim/
├── index.html      # Página HTML com estrutura e conteúdo
├── styles.css      # Estilos com tema claro/escuro
├── script.js       # JavaScript para gerenciar cookies e tema
└── README.md       # Este arquivo
```

## 🎯 Recursos Principais

✅ **Alternância de Tema** - Botão para trocar entre modo claro e escuro
✅ **Persistência com Cookies** - Preferência salva por 365 dias
✅ **Design Responsivo** - Funciona em celular, tablet e desktop
✅ **Código Didático** - Comentado e fácil de entender
✅ **Exemplos no Console** - Funções expostas para testes

## 🚀 Como Usar

### Opção 1: Abrir no Navegador Diretamente
1. Abra o arquivo `index.html` com seu navegador
2. Clique no botão "🌙 Modo Escuro" no topo
3. Recarregue a página (F5) - o tema será mantido!

### Opção 2: Usar um Servidor Local (Recomendado)

**Com Python 3:**
```bash
cd cookies_yasmim
python -m http.server 8000
```

**Com Node.js (http-server):**
```bash
npm install -g http-server
cd cookies_yasmim
http-server
```

Depois, acesse: `http://localhost:8000`

## 🍪 Entendendo os Cookies

### O que são Cookies?
Cookies são pequenos arquivos de texto (máximo ~4KB) armazenados no navegador do usuário. Eles permitem persistir dados entre sessões.

### Como Funcionam neste Exemplo:

```javascript
// 1. Salvar um cookie
setCookie('theme', 'dark', 365);  // Nome, valor, dias

// 2. Recuperar um cookie
const tema = getCookie('theme');  // Retorna: 'dark'

// 3. Deletar um cookie
deleteCookie('theme');
```

### Ciclo de Funcionamento:

1. **Página carrega** → JavaScript executa
2. **Verifica cookie** → `getCookie('theme')`
3. **Aplica tema** → `applyTheme(tema)`
4. **Usuário clica botão** → `toggleTheme()`
5. **Salva nova preferência** → `setCookie('theme', novoTema)`
6. **Próxima visita** → Cookie restaura o tema automaticamente

## 💻 Código Principal

### Funções de Cookie (script.js)

```javascript
// Criar cookie
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Obter cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        cookie = cookie.trim();
        if(cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// Deletar cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
```

### Alternância de Tema

```javascript
function toggleTheme() {
    const currentTheme = getCookie('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setCookie('theme', newTheme, 365);  // Salva em cookie
    applyTheme(newTheme);                // Aplica no DOM
}
```

## 🛠️ Testando no Console do Navegador

Abra o **Console** (F12) e execute:

```javascript
// Ver todos os cookies
showAllCookies()

// Ver valor do cookie 'theme'
getCookie('theme')

// Criar um cookie de teste
setCookie('meuCookie', 'meuValor', 30)

// Ver todos novamente
showAllCookies()

// Deletar o teste
deleteCookie('meuCookie')

// Alternar tema manualmente
toggleTheme()
```

## 🌐 Verificando Cookies no Navegador

### Google Chrome / Edge:
1. Pressione **F12** para abrir DevTools
2. Vá para **Application** (ou **Aplicativo**)
3. No menu esquerdo, clique em **Cookies**
4. Selecione o site
5. Veja o cookie `theme` listado

### Firefox:
1. Pressione **F12**
2. Vá para **Storage** (ou **Armazenamento**)
3. Expanda **Cookies**
4. Selecione o site
5. Veja o cookie `theme`

### Safari:
1. Menu → **Develop** → **Show Web Inspector**
2. Vá para **Storage**
3. Expanda **Cookies**
4. Selecione o site

## 🎨 Personalizando o Tema

### Adicionar Novas Cores

Edite `styles.css` e altere as variáveis CSS:

```css
:root {
    /* Modo Claro */
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent-color: #6200ea;
}

body.dark-mode {
    /* Modo Escuro */
    --bg-primary: #1e1e1e;
    --text-primary: #ffffff;
    --accent-color: #bb86fc;
}
```

### Adicionar Novos Temas

Modifique `script.js` para suportar mais temas (ex: tema azul, tema verde):

```javascript
const themes = ['light', 'dark', 'blue', 'green'];
let currentThemeIndex = 0;

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    setCookie('theme', newTheme, 365);
    applyTheme(newTheme);
}
```

## 📚 Conceitos Aprendidos

- ✅ Sintaxe básica de cookies em JavaScript
- ✅ Criar, ler e deletar cookies
- ✅ Persistência de dados no navegador
- ✅ Alteração dinâmica de CSS com JavaScript
- ✅ Variáveis CSS (Custom Properties)
- ✅ Gerenciamento de estado do usuário
- ✅ Detecção de preferência do sistema
- ✅ Responsividade mobile-first

## ⚠️ Limitações de Cookies

- **Tamanho limitado**: ~4KB por cookie
- **Sem segurança**: Visíveis no console (não armazene senhas!)
- **Cookies HTTP**: Não acessáveis por JavaScript se `HttpOnly` estiver ativado
- **Restrições de CORS**: Cookies têm políticas de origem

## 🔐 Alternativas Modernas

Para dados mais sensíveis ou maiores:

- **localStorage**: 5-10MB, sem expiração automática
- **sessionStorage**: 5-10MB, limpo ao fechar a aba
- **IndexedDB**: Banco de dados NoSQL no navegador
- **Web Storage API**: Mais seguro para dados modernos

## 📖 Recursos Adicionais

- [MDN - HTTP cookies](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies)
- [MDN - document.cookie](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/cookie)
- [Web Storage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API)

## 📝 Notas

Este é um projeto **100% educativo** usando HTML, CSS e JavaScript vanilla (sem frameworks). 
Perfeito para aprender conceitos fundamentais de cookies e persistência no navegador!

## 📄 Licença

Este projeto é de código aberto e livre para usar, modificar e compartilhar.

---

**Desenvolvido para fins educativos** 🎓
