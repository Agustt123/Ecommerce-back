import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from 'src/entittes/users.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    getUsers(page:number,limit:number) {
        return this.userRepository.getUsers(page,limit);
    }

    getUser(id: string) {
        return this.userRepository.getById(id);
    }

    addUser(user: Partial<Users>) {
        return this.userRepository.addUser(user);
    }

    updateUser(id: string, user: any) {
        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
}
