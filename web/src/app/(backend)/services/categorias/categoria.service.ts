import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const CategoriaService = {
  // Criar Categoria
  async create(data: { nome: string }) {
    return await prisma.categoria.create({
      data,
    });
  },

  // Listar todas
  async getAll() {
    return await prisma.categoria.findMany({
      include: { produtos: true }
    });
  },

  // Deletar
  async delete(id: string) {
    return await prisma.categoria.delete({
      where: { id },
    });
  }
};