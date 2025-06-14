import React from "react";

function BlogChecklist() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-gray-800">

      <img
        src="/manutencao.jpg"
        alt="Checklist de manutenção da autoconcreteira"
        className="rounded mb-6 mx-auto max-w-md w-full"
      />

      <h1 className="text-2xl font-bold mb-4">
        Checklist de manutenção para garantir performance da autoconcreteira
      </h1>

      <p className="mb-4">
        Para manter sua autoconcreteira operando com segurança, eficiência e durabilidade, é essencial realizar manutenções preventivas e corretivas. Um checklist de verificação evita paradas inesperadas e prolonga a vida útil do equipamento.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Itens do checklist diário</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Verificar níveis de óleo (motor e hidráulico)</li>
        <li>Checar vazamentos em mangueiras e conexões</li>
        <li>Inspecionar sistema de freios e direção</li>
        <li>Limpar resíduos de concreto da betoneira e pás</li>
        <li>Testar funcionamento do painel de controle</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Manutenção semanal</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Apertar parafusos estruturais e de fixação</li>
        <li>Lubrificar partes móveis com graxa apropriada</li>
        <li>Limpeza do filtro de ar e de óleo</li>
        <li>Verificar pressão e desgaste dos pneus</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Itens mensais e por hora trabalhada</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Troca de óleo do motor (a cada 250h, geralmente)</li>
        <li>Revisão do sistema hidráulico</li>
        <li>Atualização de calibração de sensores e válvulas</li>
        <li>Inspeção da estrutura do tambor e rolamentos</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Dicas extras</h2>
      <p>
        Sempre siga o manual do fabricante, mantenha registro de manutenções e treine os operadores para identificar sinais de falhas precocemente.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Conclusão</h2>
      <p>
        Uma autoconcreteira bem cuidada aumenta a produtividade e reduz custos com reparos. Adotar um checklist regular é uma prática simples que garante maior retorno sobre o investimento.
      </p>
    </div>
  );
}

export default BlogChecklist;
