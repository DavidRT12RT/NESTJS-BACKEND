import { IsArray, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString({message:"el nombre debe ser un string"})
    @MinLength(1,{message:"El nombre de usuario es necesario!"})
    nombre:string;

    @IsString({message:"el apellido_materno debe ser un string"})
    @MinLength(1,{message:"El apellido materno es necesario!"})
    apellido_materno:string;
    
    @IsString({message:"el apellido_paterno debe ser un string"})
    @MinLength(1,{message:"El apellido paterno es necesario!"})
    apellido_paterno:string;

    @IsNotEmpty({message:"El correo electronico no puede estar vacio!"})
    @IsEmail({},{message:"El correo electronico debe tener un formato valido"})
    correo:string;
    
    @IsString({message:"el password debe ser un string"})
    @MinLength(6,{message:"La longitud minima es de 6 caracteres!"})
    @MaxLength(50,{message:"La longitud maxima es de 50 caracteres!"})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:"El password tiene que tener mayusculas,minusculas y un numero"
    })
    password:string;

    @IsArray()
    // @ValidateNested({each:true})
    roles:string[];
};