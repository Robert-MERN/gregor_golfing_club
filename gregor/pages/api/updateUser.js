import Users from '../../models/userModel';
import connectMongo from '../../utils/functions/connectMongo';
import cryptojs from "crypto-js";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import jwt from "jsonwebtoken";
import plainPayLoadMaker from '../../utils/functions/plainPayloadMaker';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()


        // this is the id of the person who's calling this API
        const { userId: id, editMember } = req.query;


        // now finding that person with whether he is an admin or not
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "No user exists with this ID" });
        }
        // this is the id of the one who's targeted

        // checking whether 'user or admin' making this request or 'unknown user' 
        if (req.body._id === id || user.isAdmin) {
            // checking if user is also resetting the password
            if (req.body.password) {
                const { password, oldPassword, ...other } = req.body;

                if (editMember) {
                    // encrypting new password
                    const encrypted = cryptojs.AES.encrypt(password, process.env.CJS_KEY).toString();
                    await Users.findByIdAndUpdate(req.body._id, { ...other, password: encrypted });
                } else {

                    if (oldPassword === password) {
                        res.status(501).json({ success: false, message: "Can't change! old and new passwords are same." });
                    }
                    // decrypting old passowrd
                    const bytes = cryptojs.AES.decrypt(user.password, process.env.CJS_KEY);
                    const decrypted = bytes.toString(cryptojs.enc.Utf8);
                    // matching old Passwords
                    if (oldPassword === decrypted) {
                        // encrypting new password
                        const encrypted = cryptojs.AES.encrypt(password, process.env.CJS_KEY).toString();
                        await Users.findByIdAndUpdate(req.body._id, { ...other, password: encrypted });
                    } else {
                        res.status(501).json({ success: false, message: "Old passwords don't match!" });
                    }
                }
            } else {
                await Users.findByIdAndUpdate(req.body._id, req.body);
            }


            if (!editMember) {

                const updatedUser = await Users.findById(req.body._id);
                // creating plain payload to convert user obj into token
                const plainPayLoad = plainPayLoadMaker(updatedUser);
                // converting user object in token 
                const token = await jwt.sign(plainPayLoad, process.env.JWT_KEY);
                // cookie expires in 30 days
                const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));
                // checking cookie if it exists 
                const cookieUser = getCookie("userAccountToken")
                // now setting that token in cookies
                if (cookieUser) {
                    deleteCookie("userAccountToken");
                    setCookie("userAccountToken", token, { req, res, expires: expiryDate });
                } else {
                    setCookie("userAccountToken", token, { req, res, expires: expiryDate });
                }

                return res.status(200).json({ success: true, message: "Account has been updated", updatedUser: plainPayLoad });
            } else {
                return res.status(200).json({ success: true, message: "Member's Account has been updated" });
            }
        }
        // if he is an unknown user
        return res.status(401).json({ success: false, message: "You're not allowed!" })
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}