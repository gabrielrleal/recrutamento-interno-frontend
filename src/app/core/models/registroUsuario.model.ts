import { RoleEnum } from '../enums/role.enum';

export class RegistroUsuario {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public role: RoleEnum
  ) {}
}