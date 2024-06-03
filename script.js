const botoes = document.querySelectorAll('.botoes button')
const input = document.getElementById('operacao')

const operacoes = ['+', '-', '÷', 'X', 'x']
const operacoes_reais = ['+', '-', '/', '*', '*']
const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function eval_melhor(valor) {
    lista_a_partir_de_string = Array.from(valor)

    for(let i = 0; i < lista_a_partir_de_string.length; i++) {
        if(operacoes.includes(lista_a_partir_de_string[i])) {
            let pos = operacoes.indexOf(lista_a_partir_de_string[i])
            lista_a_partir_de_string[i] = operacoes_reais[pos]
        }
    }

    return eval(lista_a_partir_de_string.join(''))
}

function gerar_resultado() {
    if (input.value !== '') {
        input.value = eval_melhor(input.value)
    }
}

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        valor_input = input.value
        let valor_botao = botao.innerHTML
        if (valor_botao === 'AC') {
            input.value = ''
        } else if (valor_botao === '=') {
            gerar_resultado()
        }else {
            if(operacoes.includes(valor_botao) && operacoes.includes(valor_input.slice(-1))) {
                let valor = valor_input.slice(0, valor_input.length - 1)
                
                input.value = `${valor}${valor_botao}`
            } else {
                input.value = valor_input + valor_botao
            }
        }
    })
})

input.addEventListener('input', () => {
    let valor_input = input.value

    let ultimo_valor = valor_input.slice(-1)
    let penultimo_valor = valor_input.slice(-2, -1)

    if(!operacoes.includes(ultimo_valor) && !numeros.includes(ultimo_valor) && !operacoes_reais.includes(ultimo_valor) && !['(', ')'].includes(ultimo_valor)) {
        let valor = valor_input.slice(0, valor_input.length - 1)
        input.value = valor
    }

    
    if ((operacoes.includes(ultimo_valor) && operacoes.includes(penultimo_valor)) || (operacoes_reais.includes(ultimo_valor) && operacoes_reais.includes(penultimo_valor)) || (operacoes_reais.includes(ultimo_valor) && operacoes.includes(penultimo_valor)) || (operacoes.includes(ultimo_valor) && operacoes_reais.includes(penultimo_valor))) { 
        let valor = valor_input.slice(0, valor_input.length - 2)
                
        input.value = `${valor}${ultimo_valor}`
    }
}) 

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        gerar_resultado()
    }
})