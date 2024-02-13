import bcrypt from 'bcryptjs'


const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

const comparePassword = async( password:string, hashpassword:string)=> {
    try{
        const isMatch = await bcrypt.compare(password,hashpassword);
        return isMatch;
    }
    catch(err){
        console.error('Error comparing passwords:', err);
        throw new Error('Password comparison failed');
    }
}

export {hashPassword,comparePassword}