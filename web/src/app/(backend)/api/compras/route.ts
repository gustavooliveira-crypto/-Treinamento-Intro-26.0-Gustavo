import { NextRequest, NextResponse } from 'next/server'
import { CompraService } from '@/app/(backend)/services/compras/compra.service'
import { blockForbiddenRequests, returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import type { AllowedRoutes } from '@/types';
import { toErrorMessage } from '@/utils/api/toErrorMessage';
import { z } from 'zod';

// Validação: O Frontend SÓ PODE enviar o ID do usuário e a lista de IDs dos produtos
// Veja que o precoTotal de propósito NÃO ESTÁ AQUI, pois o backend calcula sozinho!
const createCompraSchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"),
  produtoIds: z.array(z.string()).min(1, "A compra deve ter pelo menos um produto")
});

// Apenas usuários logados e admins podem criar compras
const allowedRoles: AllowedRoutes = {
  POST: ["USER", "SUPER_ADMIN", "ADMIN"],
  GET: ["SUPER_ADMIN", "ADMIN"] // Apenas admin pode listar TODAS as compras do sistema
}

// ROTA GET: Buscar todas as compras (Exclusivo para Admins)
export async function GET(request: NextRequest) {
  try {
    //const forbidden = await blockForbiddenRequests(request, allowedRoles.GET);
    //if (forbidden) return forbidden;

    const compras = await CompraService.getAll()
    return NextResponse.json(compras, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar compras:', error)
    return NextResponse.json({ error: 'Falha ao buscar compras' }, { status: 500 })
  }
}

// ROTA POST: Criar uma nova compra
export async function POST(request: NextRequest) {
  try {
    //const forbidden = await blockForbiddenRequests(request, allowedRoles.POST);
    //if (forbidden) return forbidden;

    const body = await validBody(request);
    
    const validationResult = createCompraSchema.safeParse(body)
    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult.error);
    }

    // Chama o nosso Service, que vai buscar os preços e somar automaticamente
    const compra = await CompraService.create(validationResult.data)

    return NextResponse.json(compra, { status: 201 })

  } catch (error) {
    if (error instanceof NextResponse) return error;
    
    if (error instanceof Error) {
      // Retorna erro se o Service não achou os produtos (ex: enviou um ID falso)
      if (error.message.includes('Nenhum produto válido')) {
        return NextResponse.json(toErrorMessage(error.message), { status: 400 })
      }
    }

    return zodErrorHandler(error);
  }
}