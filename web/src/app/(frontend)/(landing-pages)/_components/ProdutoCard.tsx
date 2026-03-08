"use client";

interface ProdutoProps {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number; // O pai que avisa a quantidade
  onAdicionar: () => void; // O pai que trata a lógica
  onRemover: () => void;
}

export default function ProdutoCard({ nome, preco, descricao, quantidade, onAdicionar, onRemover }: ProdutoProps) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col gap-3 bg-white">
      <h2 className="font-bold text-xl">{nome}</h2>
      <p className="text-gray-600 text-sm flex-grow">{descricao}</p>
      <p className="font-bold text-pink-700 text-lg">R$ {preco.toFixed(2)}</p>
      
      <div className="text-center font-semibold text-gray-700 my-2">
        No carrinho: <span className="text-xl text-black">{quantidade}</span>
      </div>

      <div className="flex gap-2">
        <button onClick={onAdicionar} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1 transition-colors">+</button>
        <button onClick={onRemover} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1 transition-colors">-</button>
      </div>
    </div>
  );
}