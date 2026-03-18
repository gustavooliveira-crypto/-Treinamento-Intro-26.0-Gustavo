import { NextRequest, NextResponse } from 'next/server'
import { CategoriaService } from '@/app/(backend)/services/categorias/categoria.service'
import { blockForbiddenRequests } from '@/utils';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const forbidden = await blockForbiddenRequests(request, ["ADMIN", "SUPER_ADMIN"]);
    if (forbidden) return forbidden;

    await CategoriaService.delete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao deletar' }, { status: 500 });
  }
}