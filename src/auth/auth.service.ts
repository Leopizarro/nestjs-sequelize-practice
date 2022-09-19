import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from '../../models'
import * as argon from 'argon2';
import { userInfo } from "os";

@Injectable({})
export class AuthService{

    async signup(user: User) {
        const email = user.email;
        const hash = await argon.hash(user.hash);
        user.hash = hash;
        try {
            const userAlreadyExists = await User.findOne({where: {email}})
            if(userAlreadyExists){
                throw new ForbiddenException('User already exists')
            }
            const newUser = await User.create(user);
            return newUser
        }catch(err){
            if(err.status){
                return err
            }
            throw new BadRequestException(err.errors[0].message)
        }
    }

    async signin(user: User) {
        const signInUser = await User.findOne({ where: {email: user.email} })
        if(!signInUser){
            throw new ForbiddenException('Credentials Incorrect')
        }
        const hashComparison = await argon.verify(signInUser.hash, user.hash)
        if(!hashComparison){
            throw new ForbiddenException('Credentials Incorrect')
        }
        return signInUser
    }
}