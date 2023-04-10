import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySche = new mongoose.Schema({
    name: {
        type: String
    }
}
,{
    timestamps: true,
    versionKey: false
})
categorySche.plugin(mongoosePaginate);

export default mongoose.model("Category",categorySche)