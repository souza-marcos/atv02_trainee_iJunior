import * as reader from 'readline-sync';

import { 
        addProduct,
        showInventory,
        deleteProduct
} from './views/product'

async function main(){
    console.log('MENU PRINCIPAL');
    console.log('1 - Adicionar Produto');
    console.log('2 - Inventário');
    console.log('3 - Deletar Produto');
    console.log('4 - Sair');

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
            console.log('Saindo...');
            return;
        
        default:
            console.log('Opção inválida!');
    }
    return main();
}


main();
