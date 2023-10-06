import  csv_parser from 'csv-parser';

import {createObjectCsvWriter as createWriter} from 'csv-writer';
import { ProductInterface } from '../types/ProductInterface';
import * as fs from 'fs';

export class Product{

    private static async createHeader(path: string): Promise<void>{
        const header: ProductInterface = {
            name: '',
            weight: 0,
            value: 0,
            quantity: 0,
        };

        fs.writeFileSync(path, Object.keys(header).join(',') + '\n')
    }
    
    static async create(path: string, data_: ProductInterface): Promise<void> {

        // Create header if file don't exist    
        if(!fs.existsSync(path)) await this.createHeader(path);

        const writer = createWriter({
            path: path,
            header: [
                {id: 'name', title: 'Nome'},
                {id: 'weight', title: 'Peso'},
                {id: 'value', title: 'Valor'},
                {id: 'quantity', title: 'Quantidade'},
            ],
            append: true,
        });
        return writer.writeRecords([data_]);
    };


    // Read all Products from csv file
    static async read(path: string): Promise<ProductInterface[]>{
        return new Promise((resolve, reject) => {
            const results: ProductInterface[] = [];
            
            fs.createReadStream(path)
                .pipe(csv_parser())
                .on('data', (data: ProductInterface) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err: Error) => reject(err));
        })
    }

    // Read a Product from csv file
    static async findOne(path: string, name: string): Promise<ProductInterface | undefined> {

        if(!fs.existsSync(path)) await this.createHeader(path);

        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
            .pipe(csv_parser())
            .on('data', (data: ProductInterface) => {
                if(data.name === name) resolve(data);
            })
            .on('error', (err : Error) => reject(err))
            .on('end', () => resolve(undefined));
        });
    }

    // Update a Product from csv file
    static async update(path: string, name: string, data_: ProductInterface): Promise<void> {
        const products = await this.read(path);
        const index = products.findIndex((el) => el.name === name);
        if(index === -1) throw new Error('Produto não encontrado!');

        products[index] = data_;

        const writer = createWriter({
            path: path,
            header: [
                {id: 'name', title: 'Nome'},
                {id: 'weight', title: 'Peso'},
                {id: 'value', title: 'Valor'},
                {id: 'quantity', title: 'Quantidade'},
            ],
            append: false,
        });
        return writer.writeRecords(products);
    }

    // Delete a Product from csv file
    static async delete(path: string, name: string): Promise<void> {
        const products = await this.read(path);
        const index = products.findIndex((el) => el.name === name);
        if(index === -1) throw new Error('Produto não encontrado!');

        products.splice(index, 1);

        const writer = createWriter({
            path: path,
            header: [
                {id: 'name', title: 'Nome'},
                {id: 'weight', title: 'Peso'},
                {id: 'value', title: 'Valor'},
                {id: 'quantity', title: 'Quantidade'},
            ],
            append: false,
        });
        return writer.writeRecords(products);
    }


}