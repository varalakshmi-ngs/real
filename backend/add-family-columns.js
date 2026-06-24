import { sequelize } from "./config/database.js";
import { AboutPage } from "./models.js";
import fs from "fs";
import path from "path";

const srcFile = "C:/Users/Tanuja/.gemini/antigravity-ide/brain/1120cf85-f233-486c-abe1-ae6927b49986/media__1782280890512.jpg";
const destDir = path.join(process.cwd(), "uploads");
const destFile = path.join(destDir, "pastor_family.jpg");
const relativePath = "uploads/pastor_family.jpg";

async function run() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    // 1. Add columns to database if they don't exist
    const queryInterface = sequelize.getQueryInterface();
    const tableInfo = await queryInterface.describeTable("about_pages");

    if (!tableInfo.family_title) {
      console.log("Adding family_title column...");
      await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_title VARCHAR(255);");
    }
    if (!tableInfo.family_description) {
      console.log("Adding family_description column...");
      await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_description TEXT;");
    }
    if (!tableInfo.family_image) {
      console.log("Adding family_image column...");
      await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_image VARCHAR(255);");
    }

    // 2. Copy the file
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log("✅ Image copied to:", destFile);
    } else {
      console.error("❌ Source image not found at:", srcFile);
    }

    // 3. Seed initial data
    const teluguTitle = "రక్షకుడునైన యేసుక్రీస్తు పవిత్ర నామములో మీ అందరికీ నా వందనములు";
    const teluguDescription = `ప్రభువును, రక్షకుడునైన యేసుక్రీస్తు పవిత్ర నామములో మీ అందరికీ నా వందనములు. నా పేరు దైవజనులు డి సురేష్ గారు . దేవుని అపారమైన కృపను బట్టి, ఆయన సార్వభౌమత్వ ప్రణాళికలో ఒక సేవకుడిగా, పాస్టర్గా దేవుని మందను నడిపించే భాగ్యాన్ని నేను పొందాను. నా చిన్నతనం నుండే దేవుని వాక్యమనే సత్యం వైపు ఆకర్షితుడనై, ఆయన స్వరానికి లోబడి నా జీవితాన్ని పరిచర్యకు సమర్పించుకొన్నాను.గత 11 సంవత్సరాలుగా దేవుని కృపలో నమ్మకమైన సేవకుడిగా సాగుతూ, నలిగిన హృదయాలకు క్రీస్తు సువార్త ద్వారా ఆదరణను, నిరీక్షణను అందించడమే నా జీవిత పరమావధిగా మార్చుకున్నాను. దేవుడు నా హృగయంలో ఉంచిన గొప్ప దర్శనం (Vision) ఏంటంటే—కేవలం సంఘాన్ని నడిపించడం మాత్రమే కాదు, ప్రతి ఒక్కరినీ క్రీస్తు పోలికలోనికి మలచడం, వాక్యోపదేశం ద్వారా వారిని ఆత్మీయంగా బలపరచడం, మరియు సమాజంలో క్రీస్తు ప్రేమను చాటిచెప్పే సజీవ సాక్షులుగా వారిని నిలబెట్టడం.

ఈ ఆత్మీయ ప్రయాణంలో నా కుటుంబం నాకు దేవుడు ఇచ్చిన అతిపెద్ద బలము మరియు ఆశీర్వాదం. నేను మరియు నా సతీమణి సిస్టర్ శివాని, మా పిల్లలతో కలిసి ఏకమనస్సుతో, దేవుని భయభక్తులతో ఈ పరిచర్యను కొనసాగిస్తున్నాము. సంఘాన్ని మా సొంత కుటుంబంగా భావిస్తూ, విశ్వాసుల ప్రతి సుఖదుఃఖాలలో పాలుపంచుకుంటూ దేవుని ప్రేమను పంచుతున్నాము. దేవుని వాక్యాన్ని ఎటువంటి రాజీ లేకుండా, ఉన్నది ఉన్నట్లుగా ప్రకటించడమే మన పరిచర్య యొక్క ప్రత్యేకత. ఈ వెబ్సైట్ ద్వారా మిమ్మల్ని కలవడం నాకు ఎంతో సంతోషంగా ఉంది. మీరు ఆత్మీయంగా ఎదగడానికి, ప్రార్థనలో బలపడటానికి మా చర్చ్ ఎల్లప్పుడూ మీకు తోడుగా ఉంటుంది. దేవుని అద్భుతమైన నడిపింపును మీ జీవితంలో అనుభవించడానికి, ఆదివారం ఆరాధన లో మరియు ప్రార్థన కూడికలలో పాల్గొనవలసిందిగా మిమ్మల్ని మరియు మీ కుటుంబాన్ని ప్రేమతో ఆహ్వానిస్తున్నాను. దేవుడు మిమ్మల్ని మరియు మీ కుటుంబాలను సమృద్ధిగా దీవించును గాక! ఆమేన్.`;

    const [aboutPage, created] = await AboutPage.upsert({
      id: 1,
      familyTitle: teluguTitle,
      familyDescription: teluguDescription,
      familyImage: relativePath
    });

    console.log("✅ Seeded family section data successfully!");
  } catch (err) {
    console.error("❌ Error running script:", err);
  } finally {
    await sequelize.close();
  }
}

run();
