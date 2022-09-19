import { Controller, Post, Req, Body } from "@nestjs/common";
import { request } from "http";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}
    @Post('signup')
        async signup(@Req() request, @Body() payload) {
            console.log('payload----------------', payload);
            try {
                const newUser = await this.authService.signup(payload)
                if(newUser.email){
                    return {
                        status: '200',
                        newUser
                    }
                }else{
                    const error = newUser
                    return error
                }
            } catch(err){
                console.log('----------------------err',err)
                console.log('____________________-end');
                return err
            }
        }

        @Post('signin')
        signin(@Req() request, @Body() payload) {
            return this.authService.signin(payload)
        }
}