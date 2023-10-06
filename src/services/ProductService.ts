import { Product } from '../models/ProductModel'
import { ProductInterface } from '../types/ProductInterface'

const path = '/home/neg/Documents/dev/ijunior/trainee/trainee_iJunior_atividade_2/data/estoque.csv'

export class ProductService{

    static async getProducts() : Promise<ProductInterface[]> {
        // Busca atraves do service
        return await Product.read(path);
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
        let res = await Product.findOne(path, prod.name);
        
        if(res) throw new Error('Produto já existe no inventário!');
         
        // Salva o produto
        await Product.create(path, prod);
    }

}
