import { Schema, connection } from "mongoose"

const playersSchema = new Schema({

    fees_structure: {
        type: Array,
    }





}, { timestamps: true });


const Db = connection.useDb("Gregor");
const Players = Db.models.Players || Db.model('Players', playersSchema);
export default Players



// fees_structure: [
//     {
//         title: {
//             type: String,
//         },
//         guest_1: {
//             type: Number,
//         }
//     },
//     {
//         title: {
//             type: String,
//         },
//         guest_1: {
//             type: Number,
//         },
//         guest_2: {
//             type: Number,
//         },
//         guest_3: {
//             type: Number,
//         },
//         guest_4: {
//             type: Number,
//         },
//     },
//     {
//         title: {
//             type: String,
//         },
//         guest_1: {
//             type: Number,
//         },
//         guest_2: {
//             type: Number,
//         },
//         guest_3: {
//             type: Number,
//         },
//         guest_4: {
//             type: Number,
//         },
//     }
// ]