import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entittes/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,

    ){}

    async getUsers(page:number,limit:number){
        const skip=(page-1)* limit;
        const users =await this.usersRepository.find({
            take:limit,
            skip:skip,
        });
        return users.map(({password,...userNoPassword})=>userNoPassword);
    }

    async getById(id:string){
        const user= await this.usersRepository.findOne({
            where:{id},
            relations:{orders: true },

        });
        if (!user)
         return `no se encontro el usuario de id  ${id} `;
        const {password,...userNoPassword}=user ;
        return userNoPassword;
    }

    async addUser(user: Partial <Users>){
        const newUser= await this.usersRepository.save(user);
        const dbUser= await this.usersRepository.findOneBy({id: newUser.id})
        const {password,...userNoPassword}= dbUser;
        return userNoPassword;
    }

async updateUser(id:string, user:Users){
    await this.usersRepository.update(id,user);
    const updateUser= await this.usersRepository.findOneBy({id});
        const {password,...userNoPassword}= updateUser;
        return userNoPassword
    
}

async deleteUser(id:string){
    
    const user= await this.usersRepository.findOneBy({id});
     this.usersRepository.remove(user);
        const {password,...userNoPassword}= user;
        return userNoPassword

}

async getUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email});
}
}