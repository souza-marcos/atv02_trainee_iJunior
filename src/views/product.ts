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
    console.table(res);
}

export const deleteProduct = async () => {
    console.log('MENU - Deletar Produto');

    const name = reader.question('Nome: ');

    const found = await ProductController.find(name);
    
    if(!found) {
        console.log('Produto não encontrado!')
        return;
    }

    console.log(`Produto encontrado-> Nome: ${found.name}, Quantidade: ${found.quantity}, Valor: ${found.value}, Peso: ${found.weight}`);
    const res = reader.question('Tem certeza que deseja deletar o produto? (s/n) ');
    if(res !== 's') return;

    await ProductController.deleteProduct(name);
}
