import { NextRequest, NextResponse } from 'next/server'
import { ProdutoService } from '@/app/(backend)/services/produtos/produto.service'
import { blockForbiddenRequests, returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import type { AllowedRoutes } from '@/types';
import { toErrorMessage } from '@/utils/api/toErrorMessage';
import { z } from 'zod'; // Biblioteca de validação que seu projeto já usa

// Definimos as regras de como o Produto deve chegar do Front-end
const createProdutoSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  descricao: z.string(),
  preco: z.number().positive("O preço deve ser maior que zero"),
  categoriaIds: z.array(z.string()).optional()
});

// Apenas administradores podem CRIAR produtos
const allowedRoles: AllowedRoutes = {
  POST: ["SUPER_ADMIN", "ADMIN"]
}

// ROTA GET: Buscar todos os produtos
export async function GET() {
  try {
    const produtos = await ProdutoService.getAll()
    return NextResponse.json(produtos, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Falha ao buscar produtos' },
      { status: 500 }
    )
  }
}

// ROTA POST: Criar um novo produto
export async function POST(request: NextRequest) {
  try {
    // 1. Verifica se quem está tentando criar é ADMIN
    //const forbidden = await blockForbiddenRequests(request, allowedRoles.POST);
    //if (forbidden) return forbidden;

    // 2. Pega as informações que o Frontend enviou
    const body = await validBody(request);

    // 3. Valida se as informações estão corretas (se tem nome, preço, etc)
    const validationResult = createProdutoSchema.safeParse(body)
    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult.error);
    }

    const validatedData = validationResult.data

    // 4. Manda para o Service salvar no banco de dados!
    const produto = await ProdutoService.create(validatedData)

    return NextResponse.json(produto, { status: 201 })

  } catch (error) {
    if (error instanceof NextResponse) return error;
    
    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          toErrorMessage('Erro no banco de dados - Verifique os dados fornecidos'),
          { status: 400 }
        )
      }
    }

    return zodErrorHandler(error);
  }
}