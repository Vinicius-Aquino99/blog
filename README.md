https://vnaquino99.github.io/blog

# VN Blog
Fiz esse projeto para prática dos meus estudos de criação de API. Um blog simples, que permite o admin criar, editar, excluir e listar posts simples de texto.

## Front-end
Feito com React.js + Tailwind. Bem simples, só para ter um apelo visual para o consumo da API

## Back-end
Feito com Node.js + MongoDB. API com as rotas para:
 - Login de usuário administrador (pública)
 - Listar posts (pública)
 - Listar post por id (pública)
 - Envio de Posts (Privada)
 - Exclusão de posts (privada)
 - edição de posts (privada)

   ### Segurança
   Uso de JWT para autenticação de usuários e bcrypt para hasheamento de senhas.

   OBS.: API está hospedada no pacote FREE do Render, possui delay de request após uso inativo por muito tempo.
