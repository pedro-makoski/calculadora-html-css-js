const botoes = document.querySelectorAll('.botoes button')
const input = document.getElementById('operacao')

const operacoes = ['+', '-', '÷', 'X', 'x', ',']
const operacoes_reais = ['+', '-', '/', '*', '*', '.']
const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function eval_melhor(valor) {
    lista_a_partir_de_string = Array.from(valor)
    const index_especiais = []

    for(let i = 0; i < lista_a_partir_de_string.length; i++) {
        if(operacoes.includes(lista_a_partir_de_string[i])) {
            let pos = operacoes.indexOf(lista_a_partir_de_string[i])
            lista_a_partir_de_string[i] = operacoes_reais[pos]
        }

        if(lista_a_partir_de_string[i] === '(' && numeros.includes(lista_a_partir_de_string[i-1])) {
            index_especiais.push(i)
        }
    }

    for(let i = 0; i < index_especiais.length; i++) {
        lista_a_partir_de_string.splice(index_especiais[i] + i, 0, '*')
    } 

    return eval(lista_a_partir_de_string.join(''))
}

function gerar_resultado() {
    try {
        if (input.value !== '') {
            input.value = eval_melhor(input.value)
        }
    } catch {
        input.value = 'ERROR: click in C, and try other thing'
    }

}

function temquantosvalor(lista, valor) {
    let count = 0

    lista.forEach((item) => {
        if (item === valor) {
            count += 1
        }
    })

    return count
}

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        valor_input = input.value
        valor_input_array = Array.from(valor_input)
        let ultimo_valor = valor_input.slice(-1)

        let valor_botao = botao.innerHTML
        if (valor_botao === 'C') {
            input.value = ''
        } else if (valor_botao === '=') {
            gerar_resultado()
        }else if(valor_botao === 'AC'){
            input.value = valor_input.slice(0, valor_input.length - 1)
        }else {
            if(operacoes.includes(valor_botao) && operacoes.includes(valor_input.slice(-1))) {
                let valor = valor_input.slice(0, valor_input.length - 1)
                
                input.value = `${valor}${valor_botao}`
            } else if ((valor_input.length === 0 && (operacoes.includes(valor_botao) || operacoes_reais.includes(valor_botao)))) {
                input.value = ''
            }else if ((valor_botao === ')' && ((temquantosvalor(valor_input_array, '(') >= temquantosvalor(valor_input_array, ')') + 1) || (!numeros.includes(ultimo_valor)))) || ((operacoes.includes(valor_botao) || operacoes_reais.includes(valor_botao)) && !numeros.includes(ultimo_valor))) {
                input.value = valor_input
            }else {
                input.value = valor_input + valor_botao   
            }
        }
    })
})

input.addEventListener('input', () => {
    let valor_input = input.value
    valor_input_array = Array.from(valor_input)

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

    if (valor_input.length === 0 && (operacoes.includes(ultimo_valor) || operacoes_reais.includes(ultimo_valor))) {
        input.value = ''
    }

    if ((ultimo_valor === ')' && (!(temquantosvalor(valor_input_array, '(') >= temquantosvalor(valor_input_array, ')')) || !numeros.includes(penultimo_valor))) || ((operacoes.includes(ultimo_valor) || operacoes_reais.includes(ultimo_valor)) && !numeros.includes(penultimo_valor))) {
        input.value = valor_input.slice(0, valor_input.length - 1)
    }
}) 

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        gerar_resultado()
    }
})