import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entittes/order.entity";
import { OrderDetail } from "src/entittes/orderDetail.entity";
import { Product } from "src/entittes/product.entity";
import { Users } from "src/entittes/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderRepository{
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository (OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,


    ){}

    async addOrder (userId:string ,products:any){
        let total=0;

        const user =await this.usersRepository.findOneBy({id:userId});
        if (!user){
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`)
           

        }

        const order =new Order();
        order.date=new Date();
        order.user= user ;

        const newOrder= await this.ordersRepository.save(order);

        const productsArray= await Promise.all(
            products.map(async(element)=> {
                const product= await this.productsRepository.findOneBy({id: element.id,});

                if(!product){
                    return `Usuario con id ${userId} no encontrado`;
                }
                total == Number(product.price);
                await this.productsRepository.update(
                    {id:element.id},{stock: product.stock -1}
                );
                return product;

            }),
        );


        const orderDetail= new OrderDetail();
        orderDetail.price=Number(Number(total).toFixed(2));
        orderDetail.products=productsArray;
        orderDetail.order= newOrder;
        await this.orderDetailRepository.save(orderDetail);

        return await this.ordersRepository.find ({
            where:{id:newOrder.id},
            relations:{orderDetail:true},
        });




    }

     getOrder(id:string ){
        const order= this.ordersRepository.findOne({
            where:{id},
            relations:{
                orderDetail:{
                    products:true
                },
            }
        });
        if (!order){
            return new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

     }








}