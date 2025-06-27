const fs = require('fs');
const path = require('path');

// const DB_FILE = path.join(__dirname, 'localdb.json');
const DB_FILE = path.join(process.cwd(), 'localdb.json');


function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf8');
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function ensurePath(db, dbName, collectionName) {
    if (!db[dbName]) db[dbName] = {};
    if (!db[dbName][collectionName]) db[dbName][collectionName] = [];
}

// Manual DB creation
function createDatabase(name) {
    const db = loadDB();
    if (!db[name]) {
        db[name] = {};
        saveDB(db);
        console.log(`Database '${name}' created.`);
    } else {
        console.log(`Database '${name}' already exists.`);
    }
}

// Manual collection creation
function createCollection(dbName, collectionName) {
    const db = loadDB();
    if (!db[dbName]) db[dbName] = {};
    if (!db[dbName][collectionName]) {
        db[dbName][collectionName] = [];
        saveDB(db);
        console.log(`Collection '${collectionName}' created in database '${dbName}'.`);
    } else {
        console.log(`Collection '${collectionName}' already exists in '${dbName}'.`);
    }
}

// Insert a document (auto-creates db and collection)
function insertOne(dbName, collectionName, doc) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    doc._id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    db[dbName][collectionName].push(doc);
    saveDB(db);

    return doc._id;
}

function insertMany(dbName, collectionName, arr) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const insarr = arr.map(element => ({...element, _id : Date.now().toString(36) + Math.random().toString(36).slice(2)}))
    db[dbName][collectionName].push(...insarr);
    saveDB(db);

    return true
}

// Find documents (auto-creates if missing)
function find(dbName, collectionName, query = {}) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    return db[dbName][collectionName].filter(doc =>
        Object.entries(query).every(([k, v]) => doc[k] === v)
    );
}

// Delete one document (auto-creates if missing)
function deleteOne(dbName, collectionName, query = {}) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const collection = db[dbName][collectionName];
    const index = collection.findIndex(doc =>
        Object.entries(query).every(([k, v]) => doc[k] === v)
    );

    if (index !== -1) {
        collection.splice(index, 1);
        saveDB(db);
        return true;
    }

    return false;
}

// Update one document (auto-creates if missing)
function updateOne(dbName, collectionName, query = {}, update = {}) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const collection = db[dbName][collectionName];
    const doc = collection.find(d =>
        Object.entries(query).every(([k, v]) => d[k] === v)
    );

    if (doc) {
        Object.assign(doc, update);
        saveDB(db);
        return true;
    }

    return false;
}

function updateMany(dbName, collectionName, query = {}, update = {}) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const collection = db[dbName][collectionName];
    let updatedCount = 0;

    for (const doc of collection) {
        const isMatch = Object.entries(query).every(([k, v]) => doc[k] === v);
        if (isMatch) {
            Object.assign(doc, update); // Merge updates
            updatedCount++;
        }
    }

    if (updatedCount > 0) {
        saveDB(db);
    }

    return updatedCount; // number of documents updated
}


function deleteMany(dbName, collectionName, query = {}) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const collection = db[dbName][collectionName];
    const originalLength = collection.length;

    db[dbName][collectionName] = collection.filter(doc =>
        !Object.entries(query).every(([k, v]) => doc[k] === v)
    );

    const deletedCount = originalLength - db[dbName][collectionName].length;

    if (deletedCount > 0) {
        saveDB(db);
    }

    return deletedCount;
}

function findLast(dbName, collectionName) {
    const db = loadDB();
    ensurePath(db, dbName, collectionName);

    const collection = db[dbName][collectionName];
    return collection.length > 0 ? collection[collection.length - 1] : null;
}



module.exports = {
    createDatabase,
    createCollection,
    insertOne,
    insertMany,
    find,
    deleteOne,
    updateOne,
    updateMany,
    deleteMany,
    findLast
};
