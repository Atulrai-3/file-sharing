const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');

connectDB();

// Get all records older than 5 minutes
async function fetchData() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    // const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)} })
    const files = await File.find({ createdAt: { $lt: fiveMinutesAgo } });
    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully deleted ${file.filename}`);
            } catch(err) {
                console.log(`Error while deleting file ${file.filename}: ${err}`);
            }
        }
    }
    console.log('Job done!');
}

fetchData().then(() => {
    process.exit();
});
