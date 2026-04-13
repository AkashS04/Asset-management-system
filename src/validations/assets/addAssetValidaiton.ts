export const addAssetValidation ={
    name:{
        required:"Asset name is required",
        minLength:{
            value:2,
            message:"Minimum 2 characters"
        },
    },
    type:{
        required:"Type is required"
    },
    assignedTo:{
        required:"Assigned person is required"
    }
}