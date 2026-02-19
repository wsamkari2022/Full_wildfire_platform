import mongoose from "mongoose";
export async function connectDatabase() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Missing MONGODB_URI in environment variables");
    }
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB connected successfully");
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected. Attempting to reconnect...");
        });
        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected successfully");
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}
export function getDatabase() {
    return mongoose.connection;
}
//# sourceMappingURL=database.js.map