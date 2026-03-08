import Image from "next/image";

interface ProdutoProps {
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  quantidade: number;
  onAdicionar: () => void;
  onRemover: () => void;
}

export default function ProdutoCard({ nome, preco, descricao, imagem, quantidade, onAdicionar, onRemover }: ProdutoProps) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col bg-white">
      <div className="relative w-full h-48 mb-4">
        <Image src={imagem} alt={nome} fill className="object-contain rounded-lg" />
      </div>
      <h2 className="font-bold text-xl">{nome}</h2>
      <p className="text-gray-600 text-sm flex-grow">{descricao}</p>
      <p className="font-bold text-pink-700 text-lg my-3">R$ {preco.toFixed(2)}</p>
      
      <div className="flex gap-2">
        <button onClick={onAdicionar} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1 transition-colors">+</button>
        <button onClick={onRemover} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1 transition-colors">-</button>
      </div>
      <div className="text-center mt-2 font-bold text-gray-700">No carrinho: {quantidade}</div>
    </div>
  );
}