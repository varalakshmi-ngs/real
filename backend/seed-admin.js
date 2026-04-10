import { User } from "./models.js";
import bcrypt from "bcrypt";

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ where: { email: "admin@realtemple.com" } });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("real@Temple26", 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@realtemple.com",
      password: hashedPassword,
    });

    console.log("✅ Admin user created successfully");
    console.log("Email: admin@realtemple.com");
    console.log("Password: real@Temple26");

  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
}

// Run the function
createAdminUser();