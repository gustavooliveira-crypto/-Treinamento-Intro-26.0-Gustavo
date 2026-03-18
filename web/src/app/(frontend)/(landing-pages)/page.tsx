"use client";

import { useState } from "react";
import Navbar from "./_components/Navbar";
import ProdutoCard from "./_components/ProdutoCard";
import CartModal from "./_components/Popup";

export default function Home() {
  const produtos = [
    { id: 1, nome: "Liquidificador", preco: 250.00, descricao: "Tritura tudo", imagem: "/icons/liquidificador.png" },
    { id: 2, nome: "Geladeira", preco: 1200.50, descricao: "Grita vai Corinthians", imagem: "/icons/geladeira.png" },
    { id: 3, nome: "Televisão", preco: 1500.00, descricao: "Só passa jogos do Timão", imagem: "/icons/televisao.png" },
    { id: 4, nome: "Air Fryer", preco: 150.51, descricao: "Assa porco", imagem: "/icons/airfryer.png" },
  ];

  const [carrinho, setCarrinho] = useState<Record<number, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const alterarQuantidade = (id: number, delta: number) => {
    setCarrinho((prev) => {
      const novaQtd = (prev[id] || 0) + delta;
      return { ...prev, [id]: novaQtd > 0 ? novaQtd : 0 };
    });
  };

  const totalItens = Object.values(carrinho).reduce((a, b) => a + b, 0);
  const precoTotal = produtos.reduce((acc, prod) => acc + (carrinho[prod.id] || 0) * prod.preco, 0);

  const itensNoCarrinho = produtos
    .filter((p) => (carrinho[p.id] || 0) > 0)
    .map((p) => ({ ...p, quantidade: carrinho[p.id] }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar totalItens={totalItens} precoTotal={precoTotal} onOpenCart={() => setIsCartOpen(true)} />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        itens={itensNoCarrinho} 
        total={precoTotal} 
      />
      
      <main className="max-w-6xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Lojinha do Timão 🦅</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((p) => (
            <ProdutoCard 
              key={p.id} {...p} 
              quantidade={carrinho[p.id] || 0}
              onAdicionar={() => alterarQuantidade(p.id, 1)}
              onRemover={() => alterarQuantidade(p.id, -1)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}