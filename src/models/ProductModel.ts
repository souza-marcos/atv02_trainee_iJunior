import  csv_parser from 'csv-parser';
import {createObjectCsvWriter as createWriter} from 'csv-writer';
import * as fs from 'fs';
import * as path_node from 'path';

import { ProductInterface } from '../types/ProductInterface';


export class Product{

    private static async createHeader(path: string, filename: string): Promise<void>{
        fs.mkdirSync(path, {recursive: true});
        const header: ProductInterface = {
            name: '',
            weight: 0,
            value: 0,
            quantity: 0,
        };

        fs.writeFileSync(path_node.resolve(path, filename), Object.keys(header).join(',') + '\n')
    }
    
    static async create(path: string, filename: string, data_: ProductInterface): Promise<void> {

        // Create header if file don't exist    
        if(!fs.existsSync(path_node.resolve(path, filename))) await this.createHeader(path, filename);

        const writer = createWriter({
            path: path_node.resolve(path, filename),
            header: [
                {id: 'name', title: 'name'},
                {id: 'weight', title: 'weight'},
                {id: 'value', title: 'value'},
                {id: 'quantity', title: 'quantity'},
            ],
            append: true,
        });
        return writer.writeRecords([data_]);
    };


    // Read all Products from csv file
    static async read(path: string, filename: string): Promise<ProductInterface[]>{
        if(!fs.existsSync(path_node.resolve(path, filename))) await this.createHeader(path, filename);

        return new Promise((resolve, reject) => {
            const results: ProductInterface[] = [];
            
            fs.createReadStream(path_node.resolve(path, filename))
                .pipe(csv_parser())
                .on('data', (data: ProductInterface) => {
                    if(Object.is(data, {}) == false) results.push(data)
                })
                .on('end', () => resolve(results))
                .on('error', (err: Error) => {
                    console.log(results);
                    reject(err)});
        })
    }

    // Read a Product from csv file
    static async findOne(path: string, filename: string, name: string): Promise<ProductInterface | undefined> {

        if(!fs.existsSync(path_node.resolve(path, filename))) await this.createHeader(path, filename);

        return new Promise((resolve, reject) => {
            fs.createReadStream(path_node.resolve(path, filename))
            .pipe(csv_parser())
            .on('data', (data: ProductInterface) => {
                if(data.name === name) resolve(data);
            })
            .on('error', (err : Error) => reject(err))
            .on('end', () => resolve(undefined));
        });
    }

    // Update a Product from csv file
    static async update(path: string, filename: string, name: string, data_: ProductInterface): Promise<void> {
        const products = await this.read(path, filename);
        const index = products.findIndex((el) => el.name === name);
        if(index === -1) throw new Error('Produto não encontrado!');

        products[index] = data_;
        products.filter((el) => el != null);

        const writer = createWriter({
            path: path_node.resolve(path, filename),
            header: [
                {id: 'name', title: 'name'},
                {id: 'weight', title: 'weight'},
                {id: 'value', title: 'value'},
                {id: 'quantity', title: 'quantity'},
            ],
            append: false,
        });
        return writer.writeRecords(products);
    }

    // Delete a Product from csv file
    static async delete(path: string, filename: string, name: string): Promise<void> {
        const products = await this.read(path, filename);
        const index = products.findIndex((el) => el.name === name);
        if(index === -1) throw new Error('Produto não encontrado!');

        products.splice(index, 1);
        products.filter((el) => el != null);

        const writer = createWriter({
            path: path_node.resolve(path, filename),
            header: [
                {id: 'name', title: 'name'},
                {id: 'weight', title: 'weight'},
                {id: 'value', title: 'value'},
                {id: 'quantity', title: 'quantity'},
            ],
            append: false,
        });
        return writer.writeRecords(products);
    }


}