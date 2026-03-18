import { NextRequest, NextResponse } from 'next/server'
import { CompraService } from '@/app/(backend)/services/compras/compra.service'
import { toErrorMessage } from '@/utils/api/toErrorMessage';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const compra = await CompraService.getById(params.id)
    
    if (!compra) {
      return NextResponse.json(toErrorMessage('Compra não encontrada'), { status: 404 })
    }

    return NextResponse.json(compra, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar compra:', error)
    return NextResponse.json({ error: 'Falha ao buscar compra' }, { status: 500 })
  }
}