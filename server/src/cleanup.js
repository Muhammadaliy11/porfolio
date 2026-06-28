const mongoose = require('mongoose');
const Project = require('./models/Project');

const MONGO_URI = 'mongodb://holiqovmali_db_user:gf5hTJJ42m52lDpG@ac-taphlbb-shard-00-00.stpksiw.mongodb.net:27017,ac-taphlbb-shard-00-01.stpksiw.mongodb.net:27017,ac-taphlbb-shard-00-02.stpksiw.mongodb.net:27017/portfolio_db?ssl=true&replicaSet=atlas-wf11w5-shard-0&authSource=admin&retryWrites=true&w=majority';

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // Faqat Calculator qoladi, qolgani o'chadi
    const result = await Project.deleteMany({ title: { $ne: 'Calculator App' } });
    console.log(`✅ ${result.deletedCount} ta loyiha o'chirildi. Faqat Calculator App qoldi.`);

    const remaining = await Project.find({}, 'title');
    console.log('Qolgan loyihalar:', remaining.map(p => p.title));

    process.exit(0);
  } catch (err) {
    console.error('❌ Xato:', err.message);
    process.exit(1);
  }
};

run();
