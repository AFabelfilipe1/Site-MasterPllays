# Correção dos imports do sistema de comentários

O projeto contém os arquivos necessários nos caminhos:

- `src/services/commentService.ts`
- `src/types/comment.ts`
- `src/components/CommentsSection.tsx`

Também foi incluído `src/components/CommentSection.tsx` como compatibilidade com referências antigas que usam o nome singular. Ele reexporta o componente principal, evitando manter duas implementações diferentes.

Se estiver aplicando manualmente, mantenha exatamente os nomes e letras maiúsculas/minúsculas dos caminhos acima. GitHub Actions/Linux diferencia maiúsculas de minúsculas.

Depois de substituir os arquivos, execute `npm install` e `npm run build`.
