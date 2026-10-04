const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const SECRET_KEY = process.env.SECRET_KEY;

const teacherSchema = mongoose.Schema({
    TID: { type: String, required: true , unique : true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true }
})

const teacherModel = mongoose.model("teachers", teacherSchema);

const getTeacher = async (incoming_email, incoming_pass, cb) => {
    try {
        const result = await teacherModel.findOne({ email: incoming_email });
        if (result) {
            const { TID, firstName, lastName, email, password } = result;

            let isMatch = false;
            try {
                isMatch = await bcrypt.compare(incoming_pass, password);
            } catch (e) {
                isMatch = false;
            }

            // Fallback for legacy plain text passwords in MongoDB
            if (!isMatch && incoming_pass === password) {
                isMatch = true;
                const hashedPassword = await bcrypt.hash(incoming_pass, SALT_ROUNDS);
                await teacherModel.updateOne({ email: incoming_email }, { $set: { password: hashedPassword } });
            }

            if (!isMatch) {
                return cb(null, { message: "wrong password" });
            }

            const payload = { TID, firstName, lastName, email };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

            return cb(null, { message: "success", token });
        } else {
            return cb(null, { message: "user not found" });
        }

    } catch (err) {
        return cb(err, null);
    }
};


const createTeacher = async (teacher, cb)=>{
    try{
        console.log("teacher : ", teacher);
        const hashedPassword = await bcrypt.hash(teacher.password, SALT_ROUNDS);
        const savedTeacher = await teacherModel.create({ ...teacher, password: hashedPassword });
        const payload = { TID: savedTeacher.TID, firstName: savedTeacher.firstName, lastName: savedTeacher.lastName, email: savedTeacher.email };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
        cb({ message: "Success", error: null, token });
    }catch(err){
        cb({message : "Failed to create teacher", error : err, token: null});
    }
}

module.exports = {getTeacher, createTeacher}