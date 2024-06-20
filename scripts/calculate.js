function separate(str) {
    let lista_str = Array.from(str)
    const numbers = []
    const operator = ['*', '/', '^']
    const sinais = ['+', '-']
    const operators = []

    let valor_anterior = NaN

    for(let i = 0; i < lista_str.length; i++) {
        let valor = ['+', '-'].includes(lista_str[i]) || lista_str[i] === '.' ? `${lista_str[i]}` : parseFloat(lista_str[i])
    
        if(!isNaN(valor) || valor === '.' || ((lista_str[i] === '+' || lista_str[i] === '-'))) {
            if((valor === '+' || valor === '-') && (lista_str.length - 1 === i && (operator.includes(lista_str[i]) || sinais.includes(lista_str[i])))){
                throw new Error("Você se esqueceu de colocar o ultimo valor")
            }else if(((isNaN(valor_anterior) || (valor === '+' || valor === '-'))) && (valor_anterior !== '+' && valor_anterior !== '-')) {
                numbers.push(valor)
                valor_anterior = valor
            }else if((valor_anterior === '+' || valor_anterior === '-')) {
                let valor_junto;
                let idx;

                if(sinais.includes(valor)) {
                    valor_junto = (parseFloat(`${valor}1`) * parseFloat(`${valor_anterior}1`)) > 0 ? '+' : '-'
                    idx = numbers.lastIndexOf(valor_anterior)
                    console.log(valor_junto)
                } else if(operator.includes(valor)) {
                    throw new Error("Não se pode colocar operador depois de operador")
                } else {
                    valor_junto = parseFloat(`${valor_anterior}${valor}`)
                    idx = numbers.lastIndexOf(valor_anterior)
                }
                

                numbers[idx] = valor_junto
                valor_anterior = valor_junto

                console.log(numbers)

            }else if (valor === '.') {
                let valor_junto = `${valor_anterior}.`
                let idx = numbers.lastIndexOf(valor_anterior)

                numbers[idx] = valor_junto
                valor_anterior = valor_junto
            }else {
                let valor_junto = parseFloat(`${valor_anterior}${valor}`)
                let idx = numbers.lastIndexOf(valor_anterior)

                numbers[idx] = valor_junto
                valor_anterior = valor_junto
            }
        } else {
            if(operator.includes(valor_anterior) && operator.includes(valor)) {
                throw new Error("Não se pode colocar operador depois de operador")
            } else if(lista_str.length - 1 === i && (operator.includes(lista_str[i]) || sinais.includes(lista_str[i]))) {
                throw new Error("Você se esqueceu de colocar o ultimo valor")
            }
            numbers.push(lista_str[i])
            operators.push(lista_str[i])
            valor_anterior = NaN
        }
    }

    return [numbers, operators]
}


function operate(numbers) {
    let operator_aplicated = numbers
    const operator = ['*', '/', '^']
    const levels_operator = [1, 1, 2]
    let count_operator = 0
    let res = 0

    for(let i = 0; i < operator_aplicated.length; i++) {
        if(typeof(operator_aplicated[i]) === 'string' && levels_operator[operator.lastIndexOf(operator_aplicated[i])] === 2) {
            switch (operator_aplicated[i]) {
                case '^':
                    res = operator_aplicated[i-1] ** operator_aplicated[i+1]
                    break
            }

            operator_aplicated[i+1] = res
            operator_aplicated.splice(i, 1)
            operator_aplicated.splice(i-1, 1)

            i -= 1

            count_operator += 1
        }
    }

    for(let i = 0; i < operator_aplicated.length; i++) {
        if(typeof(operator_aplicated[i]) === 'string') {
            if(levels_operator[operator.indexOf(operator_aplicated[i])] === 1) {
                switch (operator_aplicated[i]) {
                    case '*':
                        res = operator_aplicated[i-1] * operator_aplicated[i+1]
                        break
                    case '/':
                        res = operator_aplicated[i-1] / operator_aplicated[i+1]
                        break
                }
            }

            operator_aplicated[i+1] = res
            operator_aplicated.splice(i, 1)
            operator_aplicated.splice(i-1, 1)

            i -= 1

            count_operator += 1
        }
    }

    return operator_aplicated
}

function sum_all(arr) {
    let res = 0
    arr.forEach((num) => {res += num})
    
    return res
}

function bubble_sort(array, reverso='norev', array_same_target) {
    const ordenated_array = array
    const ordenated_array_same = array_same_target

    if(reverso === 'norev') {
        for(let i = 0; i < ordenated_array.length; i++) {
            for(let j = 0; j < ordenated_array.length - i - 1; j++) {
                if(ordenated_array[j] > ordenated_array[j+1]) {
                    let temporario = ordenated_array[j+1]
                    ordenated_array[j+1] = ordenated_array[j]
                    ordenated_array[j] = temporario
                    
                    if(ordenated_array_same !== undefined) {
                        let temporario = ordenated_array_same[j+1]
                        ordenated_array_same[j+1] = ordenated_array_same[j]
                        ordenated_array_same[j] = temporario
                    }
                }
            }
        }
    } else if (reverso === 'rev') {
        for(let i = 0; i < ordenated_array.length; i++) {
            for(let j = 0; j < ordenated_array.length - i - 1; j++) {
                if(ordenated_array[j] < ordenated_array[j+1]) {
                    let temporario = ordenated_array[j+1]
                    ordenated_array[j+1] = ordenated_array[j]
                    ordenated_array[j] = temporario
                }
            }
        }
    }


    return [ordenated_array, ordenated_array_same]
}

function pos_of_parenteses(str) {
    const arr = Array.from(str)
    let pos_close_parenteses = []
    let pos_close_parenteses_ja_foi = []
    let pos_open_parenteses = []
    
    for(let i = 0; i < arr.length; i++) {
       if(arr[i] === '(') {
            pos_open_parenteses.push(i)
        } else if (arr[i] == ')') {
            pos_close_parenteses.push(i)
        }
    }

    for(let i = 0; i < arr.length; i++) { 
       if(arr[i] === ')' && pos_close_parenteses.length === pos_open_parenteses.length) {
            let mais_proximo = i - pos_open_parenteses[0];
            let mais_proximo_idx = 0
            
            for(let j = 1; j < pos_open_parenteses.length; j++) {
                if(mais_proximo > i - pos_open_parenteses[j] && i - pos_open_parenteses[j] > 0 && pos_close_parenteses_ja_foi[j] === undefined) {
                    mais_proximo = i - pos_open_parenteses[j]
                    mais_proximo_idx = j
                }
            }

            pos_close_parenteses_ja_foi[mais_proximo_idx] = true

            pos_close_parenteses[mais_proximo_idx] = i
        } else if(pos_close_parenteses.length !== pos_open_parenteses.length && pos_open_parenteses.length !== 0){
            throw new Error("Você se esqueceu dos parenteses")
        }
    }

    let [pos_close_parenteses_sorted, pos_open_parenteses_sorted] = bubble_sort(pos_close_parenteses, 'norev', pos_open_parenteses)

    return [pos_close_parenteses_sorted, pos_open_parenteses_sorted]
}
    
function separate_parenteses_and_calculate(str) {
    str_new = str

    let pos_parenteses_sorted = pos_of_parenteses(str_new)

    if(str_new.length !== 0) { 
        for(let i = 0; i < pos_parenteses_sorted.length && pos_parenteses_sorted[0].length !== 0; i++) {
            pos_parenteses_sorted = pos_of_parenteses(str_new)

            let string_formula = str_new.slice(pos_parenteses_sorted[1][i]+1, pos_parenteses_sorted[0][i])
            let [numbers, operators] = separate(string_formula)
            let div_mul_aplicated = operate(numbers, operators)
            let result = sum_all(div_mul_aplicated)
            str_new = str_new.replace(`(${string_formula})`, result)

            i -= 1
        }
    }


    return str_new 
}