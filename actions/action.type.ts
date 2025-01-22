export type TUserData = {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: 'user' | 'admin';
};

export type TUser = {
    name: string,
    username: string,
    email: string,
    phone: string,
    profilePicture?: string,
    isVerifiedUser: boolean,
    role: 'user' | 'admin',
    posts: string,
    following: string,
    followers: string
}