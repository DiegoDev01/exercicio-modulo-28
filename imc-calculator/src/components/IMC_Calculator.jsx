import React, { useState } from 'react';

const tabelaIMC = [
    { limite: 18.5, classificacao: 'Magreza', risco: 'Baixo' },
    { limite: 24.9, classificacao: 'Normal', risco: 'Normal' },
    { limite: 29.9, classificacao: 'Sobrepeso', risco: 'Elevado' },
    { limite: 34.9, classificacao: 'Obesidade Grau I', risco: 'Muito Elevado' },
    { limite: 39.9, classificacao: 'Obesidade Grau II (Severa)', risco: 'Altíssimo' },
    { limite: Infinity, classificacao: 'Obesidade Grau III (Mórbida)', risco: 'Extremo' }
];

function IMC_Calculator() {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState(null);

    const calcularIMC = () => {
        if (!altura || !peso || altura <= 0 || peso <= 0) {
            alert('Por favor, insira valores válidos para Altura e Peso.');
            setImc(null);
            setClassificacao(null);
            return;
        }

        const alturaMetros = parseFloat(altura) / 100;
        const pesoKg = parseFloat(peso);
        const imcCalculado = pesoKg / (alturaMetros * alturaMetros);

        setImc(imcCalculado.toFixed(2));

        const resultadoClassificacao = tabelaIMC.find(item => imcCalculado < item.limite);
        setClassificacao(resultadoClassificacao);
    };

    const resetForm = () => {
        setAltura('');
        setPeso('');
        setImc(null);
        setClassificacao(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calcularIMC();
    };

    return (
        <div className="imc-container">
            <h2>Calculadora de IMC</h2>

            {/* Formulário de entrada de dados */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="altura">Altura (cm):</label>
                    <input
                        id="altura"
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        placeholder="Ex: 175"
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="peso">Peso (kg):</label>
                    <input
                        id="peso"
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="Ex: 70"
                        min="1"
                        required
                    />
                </div>

                <div className="botoes">
                    <button type="submit">Calcular IMC</button>
                    <button type="button" onClick={resetForm}>Limpar</button>
                </div>
            </form>

            {/* Retorno do IMC e Classificação */}
            {imc !== null && (
                <div className="resultado-imc">
                    <h3>Seu Resultado:</h3>
                    <p className="imc-valor">Seu IMC é: <span>{imc}</span></p>
                    <p className="imc-classificacao">Classificação: <span>{classificacao?.classificacao}</span></p>
                    <p className="imc-risco">Risco de Doenças: <span>{classificacao?.risco}</span></p>
                </div>
            )}

            {/* Exibição da Tabela de Classificação */}
            <div className="tabela-referencia">
                <h4>Tabela de Classificação</h4>
                <table>
                    <thead>
                        <tr>
                            <th>IMC</th>
                            <th>Classificação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabelaIMC.map((item, index) => (
                            <tr key={index} className={classificacao?.classificacao === item.classificacao ? 'destaque' : ''}>
                                <td>{index === 0 ? `Abaixo de ${item.limite}` : index < tabelaIMC.length - 1 ? `${tabelaIMC[index - 1].limite + 0.1} a ${item.limite}` : `Acima de ${tabelaIMC[index - 1].limite + 0.1}`}</td>
                                <td>{item.classificacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IMC_Calculator;