import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

export const CompraService = {
  // 1. CRIAR COMPRA
  async create(data: { userId: string; produtoIds: string[] }) {
    
    // Passo A: Buscar os produtos
    const produtos = await prisma.produto.findMany({
      where: {
        id: { in: data.produtoIds }
      }
    });

    if (!produtos || produtos.length === 0) {
      throw new Error("Nenhum produto válido foi encontrado para esta compra.");
    }

    // Passo B: Calcular o precoTotal
    const precoTotal = produtos.reduce((acumulador, produto) => acumulador + produto.preco, 0);

    // Passo C: Salvar a compra de forma SIMPLES (Sem connect, ideal para MongoDB puro)
    return await prisma.compra.create({
      data: {
        precoTotal: precoTotal,
        userId: data.userId,
        produtoIds: data.produtoIds,
      }
    });
  },

  // 2. LISTAR TODAS AS COMPRAS (Removido o include que causa erro)
  async getAll() {
    return await prisma.compra.findMany();
  },

  // 3. BUSCAR COMPRA POR ID (Removido o include que causa erro)
  async getById(id: string) {
    return await prisma.compra.findUnique({
      where: { id }
    });
  }
};