import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { JwtPayload } from "../interfaces/jwt-payload.interface";

import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload):Promise<User>{
        /* Cuando tengamos un user que su firma sea valida y su fecha de creacion es valida retornara el usuario*/
        const { id } = payload;

        const user = await this.userRepository
        .createQueryBuilder("user")
        .where('user.id = :id', {id})
        .leftJoinAndSelect('user.roles', 'roles')
        .getOne();

        if(!user) throw new UnauthorizedException("Token NO valido!");

        if(!user.activo) throw new UnauthorizedException("Usuario no esta activo, habla con el administrador del sistema!"); 

        return user; //-> Se anadira a la request(Objecto de express) 
    }

}