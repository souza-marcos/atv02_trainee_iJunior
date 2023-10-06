import * as reader from 'readline-sync';
import { ProductController } from '../controllers/ProductController'

export const addProduct = async () => {
    console.log('MENU - Adicionar Produto')

    
    const name = reader.question('Nome: ');
    const quantity = reader.questionInt('Quantidade: ');
    const value = reader.questionInt('Valor: ');
    const weight = reader.questionInt('Peso: ');
    
    const product = {name, quantity, value, weight};
    
    await ProductController.addProduct(product);
}

export const showInventory = async () => {

    console.log('MENU - Inventário');

    const res = await ProductController.getInvertory();
    for(let product of res){
        console.log(product);
    }
}
