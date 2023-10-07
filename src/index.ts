import * as reader from 'readline-sync';

import * as prod from './views/product'

async function main(){
    console.clear();
    console.log('MENU PRINCIPAL');
    console.log('1 - Adicionar Produto');
    console.log('2 - Inventário');
    console.log('3 - Deletar Produto');
    console.log('4 - Valor Total do Inventário');
    console.log('5 - Peso Total do Inventário');
    console.log('6 - Valor Médio dos Produtos');
    console.log('7 - Peso Médio dos Produtos');
    console.log('8 - Quantidade de Itens');
    console.log('9 - Quantidade de Produtos (Tipos)')
    console.log('10 - Sair');

    let option = reader.questionInt('Opção: ');
    switch (option) {
        case 1:
            await prod.addProduct();
            break;

        case 2:
            await prod.showInventory();
            break;

        case 3:
            await prod.deleteProduct();
            break;
        
        case 4:
            await prod.totalValue();
            break;

        case 5:
            await prod.totalWeight();
            break;

        case 6:
            await prod.avgValue();
            break;
        
        case 7:
            await prod.avgWeight();
            break;

        case 8:
            await prod.totalItems();
            break;

        case 9:
            await prod.totalProducts();
            break;

        case 10:
            console.log('Saindo...');
            return;
        
        default:
            console.log('Opção inválida!');
    }
    reader.question('Pressione ENTER para continuar...');
    return main();
}


main();