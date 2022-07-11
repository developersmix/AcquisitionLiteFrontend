import { Userprofile } from './Userprofile';

export class JwtResponse {
    authorities?: string[];
    token?: string;
    userProfile?: Userprofile;
    
}