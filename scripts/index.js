const botoes = document.querySelectorAll('.botoes button')
const input = document.getElementById('operacao')

const operacoes = ['+', '-', '÷', 'X', 'x', ',']
const operacoes_nao_sinais = ['/', '*', '.', 'x', 'X', '÷', ',']
const todas_operacoes = ['÷', 'X', 'x', ',', '/', '*', '.', '+', '-', '/', '*']
const sinais = ['+', '-']
const operacoes_reais = ['+', '-', '/', '*', '*', '.']
const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
    input.readOnly = true;
}

let anciant_input = ''

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
            anciant_input = input.value
        } 
        
    }catch (e){
        alert(e)
    } finally {
        input.focus()
        input.selectionStart = input.selectionEnd = input.value.length
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
        let penultimo_valor = valor_input.slice(-2, -1)

        console.log(penultimo_valor)

        let valor_botao = botao.innerHTML
        if (valor_botao === 'C') {
            input.value = ''
        } else if (valor_botao === '=') {
            gerar_resultado()
        }else if(valor_botao === 'AC'){
            input.value = valor_input.slice(0, valor_input.length - 1)
        }else {
            if(todas_operacoes.includes(valor_botao) && todas_operacoes.includes(ultimo_valor) && (numeros.includes(penultimo_valor) || sinais.includes(valor_botao))){
                let valor = valor_input.slice(0, valor_input.length - 1)
                
                input.value = `${valor}${valor_botao}` 
            } else if(!operacoes.includes(valor_botao) && !numeros.includes(valor_botao) && !operacoes_reais.includes(valor_botao) && !['(', ')'].includes(valor_botao)) {
                let valor = valor_input
                input.value = valor
            }  else if (operacoes_nao_sinais.includes(valor_botao) && (ultimo_valor === '(' || sinais.includes(ultimo_valor))) {
                input.value = valor_input
            } else if (valor_input.length === 0 && (operacoes_nao_sinais.includes(valor_botao) || valor_botao === ')')) {
                input.value = ''
            } else if (valor_botao === ')' && (temquantosvalor(valor_input_array, '(') <= temquantosvalor(valor_input_array, ')'))) {
                input.value = valor_input  
            }else {
                if(!numeros.includes(ultimo_valor) && ultimo_valor !== ')' && valor_botao === ')') {
                    input.value = valor_input
                } else {
                    input.value = valor_input + valor_botao   
                }
            }

        }

        input.focus()
        input.selectionStart = input.selectionEnd = input.value.length
    })
})

function goto(pos) {
    input.focus()
    input.selectionStart = input.selectionEnd = pos 
}

input.addEventListener('input', () => {
    let valor_input = input.value
    valor_input_array = Array.from(valor_input)

    let ultimo_valor = valor_input.slice(-1)
    let penultimo_valor = valor_input.slice(-2, -1)
    let antepenultimo_valor = valor_input.slice(-3, -2)
    let idx_ultimo_valor = 0

    if (todas_operacoes.includes(ultimo_valor) && todas_operacoes.includes(penultimo_valor) && (numeros.includes(antepenultimo_valor) || sinais.includes(ultimo_valor))) { 
        input.value = `${penultimo_valor}${ultimo_valor}`
    } else if(!operacoes.includes(ultimo_valor) && !numeros.includes(ultimo_valor) && !operacoes_reais.includes(ultimo_valor) && !['(', ')'].includes(ultimo_valor) && input.value !== '') {
        input.value = valor_input.slice(0, valor_input.length - 1)
    }else if (operacoes_nao_sinais.includes(ultimo_valor) && (penultimo_valor === '(' || sinais.includes(penultimo_valor))) {
        input.value = valor_input.slice(0, valor_input.length - 1)
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

    if(valor_input.length > 1 && valor_input !== anciant_input) {
        for(let i = 0; i < valor_input_array.length; i++) {
            if(valor_input_array[i] !== anciant_input[i]) {
                ultimo_valor = valor_input_array[i]
                console.log(ultimo_valor)
                penultimo_valor = valor_input_array[i-1]
                antepenultimo_valor = valor_input_array[i-2]
                proximo_valor = valor_input_array[i+1]
                idx_ultimo_valor = i


                if (todas_operacoes.includes(ultimo_valor) && todas_operacoes.includes(penultimo_valor) && (numeros.includes(antepenultimo_valor) || sinais.includes(ultimo_valor))) { 
                    valor_input_array[idx_ultimo_valor - 1] = ultimo_valor
                    valor_input_array.splice(idx_ultimo_valor, 1)
                    input.value = valor_input_array.join('')
                    goto(i)
                } else if(todas_operacoes.includes(ultimo_valor) && todas_operacoes.includes(proximo_valor)) {
                    valor_input_array[idx_ultimo_valor + 1] = ultimo_valor
                    valor_input_array.splice(idx_ultimo_valor, 1)
                    input.value = valor_input_array.join('')
                    goto(i)
                }else if(!operacoes.includes(ultimo_valor) && !numeros.includes(ultimo_valor) && !operacoes_reais.includes(ultimo_valor) && !['(', ')'].includes(ultimo_valor) && input.value !== '') {
                    input.value = anciant_input
                    goto(i)
                }else if (operacoes_nao_sinais.includes(ultimo_valor) && (penultimo_valor === '(' || sinais.includes(penultimo_valor))) {
                    input.value = anciant_input
                    goto(i)
                } else if ((valor_input.length > 1 && operacoes_nao_sinais.includes(ultimo_valor) && sinais.includes(ultimo_valor))) {
                    input.value = valor_input.slice(0, valor_input.length - 1)
                    goto(i)
                } else if (valor_input.length === 1 && (operacoes_nao_sinais.includes(ultimo_valor) || ultimo_valor === ')')) {
                    input.value = ''
                    goto(i)
                } else if (ultimo_valor === ')' && (temquantosvalor(valor_input_array, '(') < temquantosvalor(valor_input_array, ')'))) {
                    input.value = anciant_input
                    goto(i)
                } else if(operacoes_nao_sinais.includes(ultimo_valor) && (penultimo_valor === undefined || (!numeros.includes(penultimo_valor) && !operacoes.includes(ultimo_valor)))) {
                    input.value = anciant_input
                    goto(i)
                }
            
                if(!numeros.includes(penultimo_valor) && penultimo_valor !== ')' && ultimo_valor === ')') {
                    input.value = anciant_input
                }

                i = valor_input_array.length
                
            } 
        }

    }

    anciant_input = input.value
}) 

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        gerar_resultado()
    }
})