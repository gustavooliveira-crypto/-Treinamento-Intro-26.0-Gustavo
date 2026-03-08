import React from 'react';

export default function ProdutoCard({ nome, preco, descricao }: { nome: string, preco: number, descricao: string }) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col gap-3 bg-white">
      <h2 className="font-bold text-xl">{nome}</h2>
      <p className="text-gray-600 text-sm flex-grow">{descricao}</p>
      <p className="font-bold text-pink-700 text-lg">R$ {preco.toFixed(2)}</p>
      
      {/* Botões exigidos pelo PDF */}
      <div className="flex gap-2 mt-2">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1 transition-colors">
          Adicionar
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1 transition-colors">
          Remover
        </button>
      </div>
    </div>
  );
}