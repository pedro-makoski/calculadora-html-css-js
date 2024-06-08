const botoes = document.querySelectorAll('.botoes button')
const input = document.getElementById('operacao')

const operacoes = ['+', '-', '÷', 'X', 'x', ',']
const operacoes_nao_sinais = ['/', '*', '.', 'x', 'X', '÷', ',']
const todas_operacoes = ['÷', 'X', 'x', ',', '/', '*', '.', '+', '-', '/', '*']
const sinais = ['+', '-']
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

        lista_a_partir_de_string_anterior = lista_a_partir_de_string[i-1]
        lista_a_partir_de_string_superior = lista_a_partir_de_string[i+1]

        if((lista_a_partir_de_string[i] === '(' && (numeros.includes(lista_a_partir_de_string_anterior) || lista_a_partir_de_string_anterior === ')'))) {
            index_especiais.push(i)
        } else if (lista_a_partir_de_string[i] === ')' && numeros.includes(lista_a_partir_de_string_superior)) {
            index_especiais.push(i+1)
        }
    }

    for(let i = 0; i < index_especiais.length; i++) {
        lista_a_partir_de_string.splice(index_especiais[i] + i, 0, '*')
    } 

    let separated_parenteses = separate_parenteses_and_calculate(lista_a_partir_de_string.join(''))
    let [numbers, operators] = separate(separated_parenteses)
    let div_mul_aplicated = operate(numbers, operators)
    let result = sum_all(div_mul_aplicated)

    return result
}

function gerar_resultado() {
    try {
        if (input.value !== '') {
            input.value = eval_melhor(input.value)
        } 
        
    }catch (e){
        input.value = e
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
            if(todas_operacoes.includes(valor_botao) && todas_operacoes.includes(ultimo_valor)){
                let valor = valor_input.slice(0, valor_input.length - 1)
                
                input.value = `${valor}${valor_botao}` 
            } else if(!operacoes.includes(valor_botao) && !numeros.includes(valor_botao) && !operacoes_reais.includes(valor_botao) && !['(', ')'].includes(valor_botao)) {
                let valor = valor_input
                input.value = valor
            }  else if (operacoes_nao_sinais.includes(valor_botao) && (ultimo_valor === '(' || sinais.includes(ultimo_valor))) {
                input.value = valor_input
            } else if (valor_input.length === 0 && (operacoes_nao_sinais.includes(valor_botao) || valor_botao === ')')) {
                input.value = ''
                console.log(input)
            } else if (valor_botao === ')' && (temquantosvalor(valor_input_array, '(') <= temquantosvalor(valor_input_array, ')')) && !(numeros.includes(ultimo_valor))) {
                input.value = valor_input  
            }else {
                if(!numeros.includes(ultimo_valor) && ultimo_valor !== ')' && valor_botao === ')') {
                    input.value = valor_input
                    console.log(input.value)
                } else {
                    input.value = valor_input + valor_botao   
                }
            }

        }
    })
})

let anciant_input = ''

input.addEventListener('input', () => {
    let valor_input = input.value
    valor_input_array = Array.from(valor_input)

    let ultimo_valor = valor_input.slice(-1)
    let penultimo_valor = valor_input.slice(-2, -1)
    let idx_ultimo_valor = 0

    if(!operacoes.includes(ultimo_valor) && !numeros.includes(ultimo_valor) && !operacoes_reais.includes(ultimo_valor) && !['(', ')'].includes(ultimo_valor) && input.value !== '') {
        input.value = valor_input.slice(0, valor_input.length - 1)
    }else if (operacoes_nao_sinais.includes(ultimo_valor) && (penultimo_valor === '(' || sinais.includes(penultimo_valor))) {
        input.value = valor_input.slice(0, valor_input.length - 1)
    } else if (todas_operacoes.includes(ultimo_valor) && todas_operacoes.includes(penultimo_valor)) { 
        input.value = `${penultimo_valor}${ultimo_valor}`
    } else if ((valor_input.length > 1 && operacoes_nao_sinais.includes(ultimo_valor) && sinais.includes(ultimo_valor))) {
        input.value = valor_input.slice(0, valor_input.length - 2)
    } else if (valor_input.length === 1 && (operacoes_nao_sinais.includes(ultimo_valor) || ultimo_valor === ')')) {
        input.value = ''
    } else if (ultimo_valor === ')' && (temquantosvalor(valor_input_array, '(') < temquantosvalor(valor_input_array, ')'))) {
        input.value = valor_input.slice(0, valor_input.length - 1)
    } 

    if(!numeros.includes(penultimo_valor) && penultimo_valor !== ')' && ultimo_valor === ')') {
        input.value = valor_input.slice(0, valor_input.length - 1)
    }

    if(valor_input.length > 1) {
        for(let i = 0; i < valor_input_array.length; i++) {
            if(valor_input_array[i] !== anciant_input[i]) {
                ultimo_valor = valor_input_array[i]
                penultimo_valor = valor_input_array[i-1]
                idx_ultimo_valor = i
                i = valor_input_array.length
            } 
        }
    }


    if(!operacoes.includes(ultimo_valor) && !numeros.includes(ultimo_valor) && !operacoes_reais.includes(ultimo_valor) && !['(', ')'].includes(ultimo_valor) && input.value !== '') {
        input.value = anciant_input
    }else if (operacoes_nao_sinais.includes(ultimo_valor) && (penultimo_valor === '(' || sinais.includes(penultimo_valor))) {
        input.value = anciant_input
    } else if (todas_operacoes.includes(ultimo_valor) && todas_operacoes.includes(penultimo_valor)) { 
        valor_input_array[idx_ultimo_valor - 1] = ultimo_valor
        valor_input_array.splice(idx_ultimo_valor, 1)
        input.value = valor_input_array.join('')
    } else if ((valor_input.length > 1 && operacoes_nao_sinais.includes(ultimo_valor) && sinais.includes(ultimo_valor))) {
        input.value = valor_input.slice(0, valor_input.length - 1)
    } else if (valor_input.length === 1 && (operacoes_nao_sinais.includes(ultimo_valor) || ultimo_valor === ')')) {
        input.value = ''
    } else if (ultimo_valor === ')' && (temquantosvalor(valor_input_array, '(') < temquantosvalor(valor_input_array, ')'))) {
        input.value = anciant_input
    } 

    if(!numeros.includes(penultimo_valor) && penultimo_valor !== ')' && ultimo_valor === ')') {
        input.value = anciant_input
    }

    anciant_input = input.value
}) 

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        gerar_resultado()
    }
})