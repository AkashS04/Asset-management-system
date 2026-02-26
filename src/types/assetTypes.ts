export interface Asset{
    id:number;
    name:string;
    type:string;
    status:"Available"|"Assigned"|"Repair"|"Retired";
    assignedTo:string|null;
}