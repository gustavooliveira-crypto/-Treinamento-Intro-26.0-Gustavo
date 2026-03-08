import React from 'react';

interface NavbarProps {
  totalItens: number;
  precoTotal: number;
}

export default function Navbar({ totalItens, precoTotal }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-black text-white p-4 flex justify-between items-center shadow-lg z-50">
      <div className="font-bold text-xl">Lojinha do Timão 🦅</div>
      
      <div className="flex gap-6 items-center">
        <span>Usuário: Gustavo Fiel</span>
        <div className="bg-white text-black px-4 py-2 rounded-full font-bold">
          Carrinho: {totalItens} itens | R$ {precoTotal.toFixed(2)}
        </div>
      </div>
    </nav>
  );
}