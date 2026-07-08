import "dotenv/config";
import { AboutPage } from "./models.js";

async function test() {
  try {
    const existingData = await AboutPage.findOne({
      include: ['teamMembers']
    });
    console.log("SUCCESS:", JSON.stringify(existingData, null, 2));
  } catch (error) {
    console.error("ERROR STACK:", error.stack);
    console.error("ERROR MESSAGE:", error.message);
  } finally {
    process.exit(0);
  }
}
test();
