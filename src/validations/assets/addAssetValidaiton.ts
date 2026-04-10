export const addAssetValidation ={
    name:{
        required:"Asset name is required",
        minLength:{
            value:3,
            message:"Minimum 3 characters"
        },
    },
    type:{
        required:"Type is required"
    },
    assignedTo:{
        required:"Assigned person is required"
    }
}