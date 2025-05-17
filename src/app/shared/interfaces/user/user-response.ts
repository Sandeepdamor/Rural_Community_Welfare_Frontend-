import { Role } from "../../../enums/role.enum";

export interface UserResponse {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: Role|null;
    profileImage: string;
}