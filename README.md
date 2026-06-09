# Projeto Cookies Yasmim

Este projeto demonstra o uso de **cookies** em JavaScript para salvar e restaurar a preferência de tema (claro/escuro) do usuário.

## Estrutura do projeto

- `index.html` - página principal
- `styles.css` - estilos de tema claro e escuro
- `script.js` - lógica de cookies e troca de tema
- `README.md` - informações do projeto

## Como usar

1. Abra `index.html` no navegador.
2. Clique no botão de alternância de tema.
3. O tema selecionado será salvo em um cookie e lembrado nas próximas visitas.

## Executando localmente

### Usando Python

```bash
cd /home/aluno/cookies_yasmim/cookies
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

### Usando Node.js

```bash
cd /home/aluno/cookies_yasmim/cookies
npx http-server
```

## O que este projeto faz

- alterna entre tema claro e escuro
- salva a preferência do usuário em cookie
- restaura o tema ao recarregar a página

## Personalizações possíveis

- adicionar mais temas (ex: azul, verde)
- mudar a duração do cookie
- adicionar um seletor de fonte ou tamanho de texto

## Observação

Este `README.md` foi atualizado para refletir o projeto atual e substituir o conteúdo antigo.

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
