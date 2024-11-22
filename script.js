const url = 'https://raw.githubusercontent.com/CamillyPR/API_1/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["Minecraft", "Roblox", "LOL", "Fortnite", "PUBG", "Genshin", "CSGO"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: 'Jogo Preferido',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#FF5733',  
                            '#33FF57', 
                            '#3357FF', 
                            '#FF33A6', 
                            '#FF8C33', 
                            '#8E44AD', 
                            '#3498DB'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Jogos', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Roblox;
            valores[1] = resp.Minecraft;
            valores[2] = resp.LOL;
            valores[3] = resp.Fortnite;
            valores[4] = resp.PUBG;
            valores[5] = resp.Genshin;
            valores[6] = resp.CSGO;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
    <p>Essas são as minhas preferências em disciplinas de estudo. <br>
    Minha área favorita é <strong>Minecraft</strong>, com um total de <span>${valores[0]}</span> pontos de interesse.</p>
    <p>Em segundo lugar, empatados temos: <strong>Roblox</strong>, que acumula <span>${valores[1]}</span> pontos, e <strong>Computação Gráfica</strong> com <span>${valores[5]}</span> pontos.</p>
    A disciplina de <strong>LOL</strong> segue de perto com <span>${valores[2]}</span> pontos.</p>
    <p>As que menos gosto são: <br>
    <strong>Fortnite</strong> com <span>${valores[3]}</span> pontos, <br>
    <strong>PUBG</strong> com <span>${valores[4]}</span> pontos, e <br>
    <strong>CSGO</strong> com <span>${valores[6]}</span> pontos, respectivamente.</p>
    `;
}