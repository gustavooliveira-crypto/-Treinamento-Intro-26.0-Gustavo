interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  itens: { nome: string; preco: number; quantidade: number }[];
  total: number;
}

export default function CartModal({ isOpen, onClose, itens, total }: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>
        <div className="space-y-2 mb-4">
          {itens.length === 0 ? <p>Carrinho vazio.</p> : itens.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.quantidade}x {item.nome}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-2 font-bold text-xl">Total: R$ {total.toFixed(2)}</div>
        <button onClick={onClose} className="mt-4 w-full bg-black text-white py-2 rounded">Fechar</button>
      </div>
    </div>
  );
}