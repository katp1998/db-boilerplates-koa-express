import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid'; 

  export const createUserRepo = async ({name, email, password}: { name: string, email: string, password: string}) => { 
      try {
        const id = uuidv4()
        const user = await User.create({id, name, email, password});
        return user

      } catch (error:any) {
        throw new Error(error.message)
      }

}

export const findUserByTokenRepo = async (refreshToken : string) => {
    try {
        const scanUser = await User.scan("refreshToken").contains(refreshToken).exec()
        
        const existingUser = {
          id: scanUser[0].id,
          name: scanUser[0].name,
        }
        return existingUser
    } catch (error : any) {
        throw new Error(error.message)
    }
} 

 export const  findUserRepo = async (email : string)=>{
        try {
            const existingUser = await User.scan("email").contains(email).exec()    
            return existingUser[0]
        } catch (error : any) {
            throw new Error(error.message)
        } 
}

export const saveRefreshTokenRepo =async (userID: string , refreshToken :string) => {
    try {
        const updatedUser = await User.update({id: userID, refreshToken})
        
    } catch (error : any) {
        throw new Error(error.message)
    }

    

}

export const removeRefreshTokenRepo = async (refreshToken : string) => {
    try {
        const user = await findUserByTokenRepo(refreshToken)
        const id  = user?.id
        
        const updatedUser = await User.update({id: id, refreshToken: ''})  
        

    } catch (error : any) {
        throw new Error(error.message)
    }
}    

export const findUserByIdRepo =async (userID:string) => {
    try {
        const scanUser  = await User.scan("id").contains(userID).exec()
        return scanUser[0]
    } catch (error : any) {
        throw new Error(error.message)
    }
}


