import { NextRequest, NextResponse } from 'next/server'
import { CategoriaService } from '@/app/(backend)/services/categorias/categoria.service'
import { blockForbiddenRequests, returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import type { AllowedRoutes } from '@/types';
import { z } from 'zod';

const createCategoriaSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
});

// Definindo explicitamente conforme o padrão que você me mandou
const allowedRoles: AllowedRoutes = {
  POST: ["SUPER_ADMIN", "ADMIN"]
}

export async function GET() {
  try {
    const categorias = await CategoriaService.getAll()
    return NextResponse.json(categorias, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao buscar categorias' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // COMENTE AS DUAS LINHAS ABAIXO:
    // const forbidden = await blockForbiddenRequests(request, allowedRoles.POST);
    // if (forbidden) return forbidden;

    const body = await validBody(request);
    
    const validationResult = createCategoriaSchema.safeParse(body)
    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult.error);
    }

    const categoria = await CategoriaService.create(validationResult.data);

    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    return zodErrorHandler(error);
  }
}