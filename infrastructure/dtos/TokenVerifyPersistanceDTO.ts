export interface TokenVerifyPersistanceDTO{
    readonly id: string;
    readonly email: string;
    readonly tf_token: string;
    readonly confirmed_at: Date|void;
    readonly created_at: Date
}