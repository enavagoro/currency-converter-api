export interface User {
  name: string,
  lastName: string,
  rut: string,
  dateOfBirth: Date,
  phone: string,
  email: string,
  rol: Rol,
  password: string,
  status: boolean
};

export type Rol = 'admin' | 'executive'