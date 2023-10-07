import { Product } from '../models/ProductModel'
import { ProductInterface } from '../types/ProductInterface'

import * as path_node from 'path'

const path = path_node.resolve('./data');
const filename = 'estoque.csv';

export class ProductService{

    static async getProducts() : Promise<ProductInterface[]> {
        // Busca atraves do service
        return await Product.read(path, filename);
    }

    static async saveProduct(prod : ProductInterface){
        
        // Valida as entradas do Produto
        if(prod.name === '' || prod.name == undefined ||
        prod.weight == undefined ||
        prod.value == undefined || 
        prod.quantity == undefined){
            throw new Error('Todos os campos devem ser preenchidos!');
        }

        // Busca os produtos salvos e verifica se já existe algum que possui o mesmo identificador
        let res = await Product.findOne(path, filename, prod.name);
        
        if(res) throw new Error('Produto já existe no inventário!');
         
        // Salva o produto
        await Product.create(path, filename, prod);
    }

    static async deleteProduct(name : string){
        
        // const found = Product.findOne(path, name);
        // if(!found) throw new Error('Produto não encontrado!');

        await Product.delete(path, filename, name);
    }

    static async find(name : string) : Promise<ProductInterface | undefined>{
        return await Product.findOne(path, filename, name);
    }

}
