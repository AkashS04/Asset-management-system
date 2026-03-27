export const addAssetValidation ={
    name:{
        required:"Asset name is required",
        minLength:{
            value:3,
            required:"Minimum 3 characters"
        }
    },
    type:{
        required:"Type is required"
    },
    AssignedTo:{
        required:"Assigned person is required"
    }
}