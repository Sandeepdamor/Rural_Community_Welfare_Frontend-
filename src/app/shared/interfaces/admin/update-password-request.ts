export interface UpdatePasswordRequest{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}