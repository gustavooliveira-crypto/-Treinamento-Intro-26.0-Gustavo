import LandingPagesNav from "@/components/base/nav/InitialNav";
import { headers } from "next/headers";
import { auth } from "@/auth";
import ProdutoCard from "./_components/ProdutoCard";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const isLogged = !!session?.user;

  // Sua lista de produtos alvinegros
  const produtos = [
    { id: 1, nome: "Liquidificador do Corinthians", preco: 250.00, descricao: "Fabricado para triturar tudo verde" },
    { id: 2, nome: "Geladeira Corinthians", preco: 120.50, descricao: "Quando você abre ela grita vai Corinthians" },
    { id: 3, nome: "Televisão Corinthians", preco: 1500.00, descricao: "Transmite apenas jogos do Corinthians" },
    { id: 4, nome: "Air Fryer Corinthians", preco: 15.90, descricao: "Feita para assar porco" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <LandingPagesNav isLogged={isLogged} />
      
      <main className="max-w-6xl mx-auto pt-24 pb-16 px-4">
        <h1 className="font-bold text-4xl text-gray-900 text-center mb-10">Lojinha do Gustavo - Corinthians 🦅</h1>
        
        {/* Grid para garantir a responsividade pedida no PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              nome={produto.nome} 
              preco={produto.preco} 
              descricao={produto.descricao} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}