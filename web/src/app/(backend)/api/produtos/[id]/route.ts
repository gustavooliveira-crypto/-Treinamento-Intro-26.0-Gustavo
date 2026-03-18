import { NextRequest, NextResponse } from 'next/server'
import { ProdutoService } from '@/app/(backend)/services/produtos/produto.service'
import { blockForbiddenRequests, returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import type { AllowedRoutes } from '@/types';
import { toErrorMessage } from '@/utils/api/toErrorMessage';
import { z } from 'zod';

// Esquema de validação para edição (todos os campos são opcionais, pois podemos querer editar só o preço, por exemplo)
const updateProdutoSchema = z.object({
  nome: z.string().min(1, "O nome não pode ser vazio").optional(),
  descricao: z.string().optional(),
  preco: z.number().positive("O preço deve ser maior que zero").optional(),
  categoriaIds: z.array(z.string()).optional()
});

// Apenas administradores podem EDITAR ou DELETAR produtos
const allowedRoles: AllowedRoutes = {
  PATCH: ["SUPER_ADMIN", "ADMIN"],
  DELETE: ["SUPER_ADMIN", "ADMIN"]
}

// ROTA GET: Buscar UM produto específico pelo ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const produto = await ProdutoService.getById(params.id)
    
    if (!produto) {
      return NextResponse.json(toErrorMessage('Produto não encontrado'), { status: 404 })
    }

    return NextResponse.json(produto, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json({ error: 'Falha ao buscar produto' }, { status: 500 })
  }
}

// ROTA PATCH: Atualizar um produto
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.PATCH);
    if (forbidden) return forbidden;

    const body = await validBody(request);
    const validationResult = updateProdutoSchema.safeParse(body)
    
    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult.error);
    }

    const produtoAtualizado = await ProdutoService.update(params.id, validationResult.data)

    return NextResponse.json(produtoAtualizado, { status: 200 })
  } catch (error) {
    if (error instanceof NextResponse) return error;
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(toErrorMessage('Produto não encontrado'), { status: 404 })
    }
    return zodErrorHandler(error);
  }
}

// ROTA DELETE: Deletar um produto
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.DELETE);
    if (forbidden) return forbidden;

    await ProdutoService.delete(params.id)

    // Status 204 significa "Sucesso, mas não tem conteúdo para retornar"
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof NextResponse) return error;
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(toErrorMessage('Produto não encontrado'), { status: 404 })
    }
    return NextResponse.json({ error: 'Falha ao deletar produto' }, { status: 500 })
  }
}