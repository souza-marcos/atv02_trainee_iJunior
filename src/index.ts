import * as reader from 'readline-sync';

import { 
        addProduct,
        showInventory,
        deleteProduct,
        totalValue,
        totalWeight,
        avgValue,
        avgWeight
} from './views/product'
/*
const test = async () =>{
    await totalValue();
}

test();*/

async function main(){
    console.log('MENU PRINCIPAL');
    console.log('1 - Adicionar Produto');
    console.log('2 - Inventário');
    console.log('3 - Deletar Produto');
    console.log('4 - Valor Total do Inventário');
    console.log('5 - Peso Total do Inventário');
    console.log('6 - Valor Médio dos Produtos');
    console.log('7 - Peso Médio dos Produtos');
    console.log('8 - Sair');

    let option = reader.questionInt('Opção: ');
    switch (option) {
        case 1:
            await addProduct();
            break;

        case 2:
            await showInventory();
            break;

        case 3:
            await deleteProduct();
            break;
        
        case 4:
            await totalValue();
            break;

        case 5:
            await totalWeight();
            break;

        case 6:
            await avgValue();
            break;
        
        case 7:
            await avgWeight();
            break;

        case 8:
            console.log('Saindo...');
            return;
        
        default:
            console.log('Opção inválida!');
    }
    return main();
}


main();