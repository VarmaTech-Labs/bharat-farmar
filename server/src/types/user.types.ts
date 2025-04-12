interface IUser {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    password: string;
    profilePicture: string; 
    isActive: boolean;
    isVerified: boolean;
}

interface IUserCreate extends IUser {
    email?: string;
    phone?: string;
    password: string;
}

interface IUserUpdate extends Partial<IUserCreate> {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    password: string;
    profilePicture: string; 
    isActive: boolean;
    isVerified: boolean;
}

 interface IUserLogin {
    email?: string;
    phone?:string,
    password: string;
}



export { IUser,IUserCreate ,IUserUpdate,IUserLogin}
