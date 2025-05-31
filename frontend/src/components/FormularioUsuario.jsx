import { useState } from "react";
import axios from "axios";

const FormularioUsuario = ({ dadosAnalise, onSubmit }) => {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
    });

    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        try {
            const payload = {
                ...form,
                ...dadosAnalise, // contém cimento, areia, brita, etc.
            };

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/analises`, payload);

            alert("Análise registrada com sucesso!");

            onSubmit(payload);
        } catch (err) {
            console.error("Erro ao salvar análise:", err);
            alert("Erro ao salvar análise");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">📋 Informe seus dados antes de calcular</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite seu nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="exemplo@dominio.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        type="text"
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={form.telefone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="md:col-span-3">
                    <button
                        type="submit"
                        disabled={enviando}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        {enviando ? "Enviando..." : "Calcular e Mostrar Resultado"}
                    </button>
                </div>
            </form>
        </div>
    );

};

export default FormularioUsuario;
