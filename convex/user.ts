import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const createUser = mutation({
  args: { email: v.string(),
    username:v.string(),
    


   },
  handler: async (ctx, args) => {
    const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()//to collect the records
    if(user?.length==0){
        await ctx.db.insert('users',{
            email:args.email,
            username:args.username
        })
        return "user inserted"
    }
    return "user already exists"
  },
});