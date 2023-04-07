import mongoose from "mongoose";

const categorySche = new mongoose.Schema({
    name: {
        type: String
    }
}
,{
    timestamps: true,
    versionKey: false
})

export default mongoose.model("Category",categorySche)