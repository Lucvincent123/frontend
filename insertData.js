const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://julien35brelivet:0QLOggk0mbImY7pY@webtc.m9gykch.mongodb.net/?retryWrites=true&w=majority&appName=WebTC";  // Remplace par ton URI MongoDB Atlas

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const items = [
  { text: "Random", action: 10, imageUrl: "https://images.photowall.com/products/47903/world-map-detailed-without-roads.jpg?h=699&q=85" },
  { text: "Vietnam", action: 0, imageUrl: "https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg" },
  { text: "Science", action: 1, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6LEDKkakNSqbYbUWuFbxeX5-JmxSQAr-rA&s" },
  { text: "Histoire", action: 2, imageUrl: "https://static.lpnt.fr/images/2012/07/03/la-liberte-guidant-le-peuple-delacroix_423221_660x287.jpg" },
  { text: "INSA", action: 3, imageUrl: "https://www.insa-lyon.fr/sites/www.insa-lyon.fr/files/108_63b6334.jpg" },
  { text: "Contemporain", action: 5, imageUrl: "https://us.123rf.com/450wm/pabkov/pabkov1507/pabkov150700397/42366943-tokyo-japon-21-mars-quartier-de-shibuya-le-21-mars-2015-%C3%A0-tokyo-au-japon-le-quartier-est-un.jpg" },
  { text: "Moyen-Âge", action: 6, imageUrl: "https://i0.wp.com/www.histoire-normandie.fr/wp-content/uploads/2015/06/6035943537_1142331228_o.jpg?resize=530%2C426" },
  { text: "Antiquité", action: 7, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Raphael_School_of_Athens.jpg" },
  { text: "Préhistoire", action: 8, imageUrl: "https://www.domainedulac-dordogne.com/domainedulac/wp-content/uploads/2018/03/LASCAUX.jpg" },
  { text: "Moderne", action: 9, imageUrl: "https://www.francebleu.fr/s3/cruiser-production/2018/06/4464e217-892f-4b79-8bea-099e2c146667/1200x680_gettyimages-526742236.jpg" }
];

async function run() {
  try {
    await client.connect();
    const database = client.db("test");  // Remplace "myDatabase" par le nom de ta base de données
    const collection = database.collection("categories");  // Remplace "items" par le nom de ta collection

    const result = await collection.insertMany(items);  // Insérer plusieurs documents
    console.log(`${result.insertedCount} documents insérés.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
