import { ProductService } from '../services/ProductService'
import { ProductInterface } from '../types/ProductInterface'

export class ProductController{

    static async addProduct(el : ProductInterface) {
        try{
            await ProductService.saveProduct(el);
            console.log('Produto adicionado com sucesso!');
        }catch(err : unknown){
            if(typeof err === 'string') console.error('ERRO (controller): ', err);
            else if(err instanceof Error) console.error('ERRO (controller): ', err.message);
            else console.error('ERRO (controller): ERRO DESCONHECIDO');
        }
    }

    static async getInvertory() : Promise<ProductInterface[]> {
        let res : ProductInterface[] = [];    
        try{
            res = await ProductService.getProducts();
        }catch(err){
            console.error('Erro: ', err)
        }
        return res;
    }

};