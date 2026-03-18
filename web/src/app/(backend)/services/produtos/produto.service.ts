// Importando o cliente do Prisma que acabamos de gerar
import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

export const ProdutoService = {
  // 1. Criar um Produto (POST)
  async create(data: { nome: string; descricao: string; preco: number; categoriaIds?: string[] }) {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        categoriaIds: data.categoriaIds || [], // Se não enviar categorias, fica uma lista vazia
      },
    });
  },

  // 2. Listar todos os Produtos (GET)
  async getAll() {
    return await prisma.produto.findMany({
      include: {
        categorias: true, // Já traz as categorias junto com o produto
      }
    });
  },

  // 3. Buscar um Produto específico pelo ID (GET /:id)
  async getById(id: string) {
    return await prisma.produto.findUnique({
      where: { id },
      include: {
        categorias: true,
      }
    });
  },

  // 4. Atualizar um Produto (PATCH)
  async update(id: string, data: { nome?: string; descricao?: string; preco?: number; categoriaIds?: string[] }) {
    return await prisma.produto.update({
      where: { id },
      data,
    });
  },

  // 5. Deletar um Produto (DELETE)
  async delete(id: string) {
    return await prisma.produto.delete({
      where: { id },
    });
  }
};