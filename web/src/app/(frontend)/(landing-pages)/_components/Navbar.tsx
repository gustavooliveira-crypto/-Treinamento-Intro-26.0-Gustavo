import Image from "next/image";
import React from 'react';

interface NavbarProps {
  totalItens: number;
  precoTotal: number;
  onOpenCart: () => void;
}

export default function Navbar({ totalItens, precoTotal, onOpenCart }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-black text-white p-4 flex justify-between items-center shadow-lg z-50">
      <div className="flex items-center gap-3">
        <Image src="/logotimao.png" alt="Logo Timão" width={40} height={40} className="rounded-full" />
        <span className="font-bold text-xl">Lojinha do Timão 🦅</span>
      </div>
      
      <div 
        onClick={onOpenCart} 
        className="bg-white text-black px-4 py-2 rounded-full font-bold cursor-pointer hover:bg-gray-200 transition-colors"
      >
        Carrinho: {totalItens} | R$ {precoTotal.toFixed(2)}
      </div>
    </nav>
  );
}