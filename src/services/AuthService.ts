import api from "./api";

type UserType = 'customer' | 'organizer';

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  userType?: UserType;
}

export const register = async (data: AuthFormData) => {
    try {
        const response = await api.post("/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role: data.userType
        });

        return response.data;
    } catch (e) {
        console.error("Cannot register: ", e);
        throw e;
    }
};

export const login = async (data: AuthFormData) => {
    try{
        const response = await api.post("/auth/login",{
            email: data.email,
            password: data.password,

        });

        return response.data;
    }catch(e){
        console.error("cant register : ",e);
        throw e;
    }
};

export const logoutUser = async () => {
    try{
        const response = await api.post("/auth/logout");
        return response.data;

    }catch(e){
        console.error('cant logout : ',e );
        throw e;
    }
};