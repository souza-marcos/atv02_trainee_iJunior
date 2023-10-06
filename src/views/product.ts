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

// BUG HERE
export const totalValue = async () => {
    console.log('MENU - Valor Total do Inventário');

    const res = await ProductController.total_value();
    console.log(`Valor total: R$ ${(res !== undefined)?res/100.0:'0,00'}`);
}

export const totalWeight = async () => {
    console.log('MENU - Peso Total do Inventário');

    const res = await ProductController.total_weight();
    console.log(`Peso total: ${(res !== undefined)?res/1000.0:'0,00'}Kg`);
}

export const avgValue = async () => {
    console.log('MENU - Valor Médio do Inventário');

    const res = await ProductController.avg_value();
    console.log(`Valor médio: R$ ${(res !== undefined)?res/100.0:'0,00'}`);
}

export const avgWeight = async () => {  
    console.log('MENU - Peso Médio do Inventário');

    const res = await ProductController.avg_weight();
    console.log(`Peso médio: ${(res !== undefined)?res/1000.0:'0,00'}Kg`);
}

export const totalItems = async () => {
    console.log('MENU - Quantidade de Itens');

    const res = await ProductController.count_items();
    console.log(`Quantidade de itens: ${res}`);
}

export const totalProducts = async () => {
    console.log('MENU - Quantidade de Produtos (Tipos)');

    const res = await ProductController.count_products();
    console.log(`Quantidade de produtos: ${res}`);
}
