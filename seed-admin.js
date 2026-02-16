const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const hashedPassword = await bcrypt.hash('admin@2026', 10);

        await Admin.findOneAndUpdate(
            { username: 'superadmin' },
            { username: 'superadmin', password: hashedPassword },
            { upsert: true, new: true }
        );

        console.log('Master Admin seeded: superadmin / admin@2026');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedAdmin();
// authorid:- bela26
// passowrd :bela@123
