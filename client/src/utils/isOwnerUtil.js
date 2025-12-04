export default function IsOwner (user , game) {
     let owner = false
        if(user?._id === game._ownerId) {
         owner = true
        } 
        return owner
    }