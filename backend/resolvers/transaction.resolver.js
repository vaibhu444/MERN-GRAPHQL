import Transaction from "../models/transaction.model.js";


const transactionResolver = {
    Query: {
        transactions: async(_,args,context)=>{
            try {
                if(!context.getUser()) throw new Error('Unauthorized');
                const userId = context.getUser()._id;
                const transactions = await Transaction.find({userId});
                return transactions;
                
            } catch (error) {
                console.error("error in getting transaction : ", error)
                throw new Error('error in getting transaction')
            }
        },
        transaction: async(_,{transactionId})=>{
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.error("error in getting transaction : ", error)
                throw new Error('error in getting transaction')
            }
        },
        categoryStatistics: async(_, {input} ,context)=>{
            if(!context.getUser()) throw new Error('Unauthorized');
            const userId = context.getUser()._id;
            const transactions = await Transaction.find({
                userId
            });

            let categoryMap = {}
            transactions.forEach((transaction)=>{
                if(!categoryMap[transaction.category]){
                    categoryMap[transaction.category]=0
                }
                categoryMap[transaction.category]+=transaction.amount;
            });
            return Object.entries(categoryMap).map(([category, totalAmountPerCategoty])=>({category, totalAmountPerCategoty}))
        }
       
    },
    Mutation: {
        createTransaction: async(_,{input},context)=>{
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                console.error("error in creating transaction : ", error)
                throw new Error('error in creating transaction')
            }
        },
        updateTransaction: async (_,{input},context)=>{
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
                return updatedTransaction;
            } catch (error) {
                console.error("error in updating transaction : ", error)
                throw new Error('error in updating transaction')
            }
            
        },
        deleteTransaction: async(_,{transactionId}, context)=>{
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (error) {
                console.error("error in deleting transaction : ", error)
                throw new Error('error in deleting transaction')
            }
            
        },

    }
}

export default transactionResolver