
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
const userResolver = {
    Mutation:{
        signUp: async(_,{input}, context)=>{
            try {
                const {username, name, password, gender} = input;
                
                if(!username || !name || !password || !gender){
                    throw new Error('All Fields Are Required');
                }
                const existingUser=await User.findOne({username});
                if (existingUser){
                    throw new Error('User already exist')
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // https://avatar-placeholder.iran.liara.run/
				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender==='male' ? boyProfilePic : girlProfilePic
                });
                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (error) {
                console.error("error in sign up: ", error)
                throw new Error(error.message || 'Internal Server Error')
            }
        },
        login: async(_,{input}, context)=>{
            try {
                const {username,password} = input;
                if (!username || !password) throw new Error('All Fields Requiered')
                const {user} = await context.authenticate('graphql-local',{username, password});
                await context.login(user);
                return user;
            } catch (error) {
                console.error("error in log in: ", error)
                throw new Error(error.message || 'Internal Server Error')
            }
        },
        logout: async(_, args, context)=>{
            try {
                await context.logout();
                context.req.session.destroy((err)=>{
                    if (err) throw err;
                });
                context.res.clearCookie('connect.sid');
                return {message: 'Log Out Successfull'}
                
            } catch (error) {
                console.error("error in log out: ", error)
                throw new Error(error.message || 'Internal Server Error')
            }
        }
    },
    Query: {
        authUser: (_,args,context)=>{
            try {
                const user=context.getUser();
                return user;
            } catch (error) {
                console.error("error in authUser : ", error)
                throw new Error(error.message || 'Internal Server Error')
            }
        },
        user: async(_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error("error in user query : ", error)
                throw new Error(error.message || 'Error getting user')
            }
            
        }

    },
}

export default userResolver;