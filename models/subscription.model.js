import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [100, "Name must be at least 3 characters long"],
    },
    price:{
        type: Number,
        required: [true,"Price is required"],
        min: [0, "Price must be a greater than 0"],
    },
    currency:{
        type: String,
        required: true,
        trim: true,
        enum: ["USD", "EUR", "GBP",],
        default: "USD",
    },
    frequency:{
        type: String,
        required: true,
        enum: ["daily", "weekly", "monthly", "yearly"],

    },
    startDate:{
        type: Date,
        required: true,
        trim: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"],
        validator:{
            validate: (value)=> value <= new Date(),
            message: "Renewal Date must be in the past",
        }
    },
    renewalDate:{
        type: Date,
        trim: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, "Renewal Date must be in YYYY-MM-DD format"],
        validator:{
            validate: function(value) { 
                return value >= this.startDate;
            },
            message: "Renewal Date must be in the future",
        }
    },
    status:{
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    category:{
        type: String,
        enum: ["entertainment", "education", "health", "fitness", "food", "travel", "other"],
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        index: true,
    }
    
}, {timestamps: true});

subscriptionSchema.pre("save",function(next){
    if(!this.renewalDate){
        const renewalPeriods ={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }
        this.renewalDate = new Date(this.startDate);

        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;