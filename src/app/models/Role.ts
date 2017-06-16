import {RoleAcl} from "./RoleAcl";
/**
 * Created by beou on 4/13/17.
 */

export class Role {
    roleID: string;
    displayName: string;
    description: string;
    isActive: boolean;
    global: boolean;
    default: boolean;
    notes:string;
    Acl: RoleAcl;
}