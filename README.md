
# simple-node-db

A lightweight, zero-dependency, JSON-based local database for Node.js projects. Inspired by MongoDB, `simple-node-db` offers an intuitive API for managing databases, collections, and documents — all stored in a single JSON file on your disk.

Perfect for CLI tools, prototypes, small-scale applications, offline-first apps, or any use case where simplicity and local persistence matter.

---


-   📦 Installation
    
-   🧰 Features
    
-   🔤 Syntax for each method
    
-   🧪 Detailed examples
    
-   🔍 Output expectations
    
-   📚 API Reference
    
-   💡 Notes and Best Practices
    

----------


## 📦 Installation

```bash
npm install simple-node-db

```

----------

## 📁 How It Works

All data is stored in a single file named `localdb.json` in your project root. It contains multiple databases, each with collections and JSON objects.

Example structure:

```json
{
  "myDB": {
    "users": [
      { "name": "Alice", "age": 25 },
      { "name": "Bob", "age": 30 }
    ]
  }
}

```

----------

## 🧰 Features

-   Databases and collections (MongoDB-style)
    
-   Auto-creates databases and collections if missing
    
-   File-based persistent storage
    
-   Easy document operations
    
-   Zero external dependencies
    

----------

## ✨ Usage

### 1. Import the module

```js
const db = require('simple-node-db');

```

----------

## 🔤 Syntax & Examples

### 📥 `insertOne(database, collection, object)`

Inserts a single document.

```js
db.insertOne('company', 'employees', { name: 'Alice', role: 'Engineer' });

```

----------

### 🔍 `find(database, collection, queryObject)`

Finds all matching documents.

```js
db.find('company', 'employees', { role: 'Engineer' });
// → [{ name: 'Alice', role: 'Engineer' }]

```

> Matching is done with **strict equality** (`===`).

----------

### ✏️ `updateOne(database, collection, queryObject, updateObject)`

Updates the first matching document.

```js
db.updateOne('company', 'employees', { name: 'Alice' }, { role: 'Senior Engineer' });

```

----------

### ✏️ `updateMany(database, collection, queryObject, updateObject)`

Updates **all** matching documents.

```js
db.updateMany('company', 'employees', { role: 'Engineer' }, { department: 'Tech' });

```

----------

### ❌ `deleteOne(database, collection, queryObject)`

Deletes the **first** document that matches.

```js
db.deleteOne('company', 'employees', { name: 'Alice' });

```

----------

### ❌ `deleteMany(database, collection, queryObject)`

Deletes **all** matching documents.

```js
db.deleteMany('company', 'employees', { department: 'Tech' });

```

----------

### 🧾 `findLast(database, collection)`

Returns the **last inserted** document in the collection.

```js
const lastEmployee = db.findLast('company', 'employees');
console.log(lastEmployee);

```

----------

### 🏗️ `createDatabase(databaseName)`

Creates a new database (not necessary — handled automatically).

```js
db.createDatabase('school');

```

----------

### 📂 `createCollection(databaseName, collectionName)`

Creates a new collection (not necessary — handled automatically).

```js
db.createCollection('school', 'students');

```

----------

## 📚 API Reference

Function

Description

`insertOne(db, collection, obj)`

Adds a new document

`find(db, collection, query)`

Retrieves matching documents

`updateOne(db, collection, query, update)`

Updates first match

`updateMany(db, collection, query, update)`

Updates all matches

`deleteOne(db, collection, query)`

Deletes first match

`deleteMany(db, collection, query)`

Deletes all matches

`findLast(db, collection)`

Returns last inserted object

`createDatabase(name)`

Manually creates database

`createCollection(db, name)`

Manually creates collection

----------

## 📁 localdb.json File

-   File auto-generated in your project root
    
-   Do not manually edit unless necessary
    
-   You can delete it to reset your data
    

----------

## ⚠️ Notes

-   Matching is done with shallow equality (`{ key: value }`)
    
-   No indexing or performance optimization (keep small)
    
-   File I/O is synchronous (for simplicity)
    

----------

## 🧪 Example Project

```js
const db = require('simple-node-db');

// Insert users
db.insertOne('usersDB', 'users', { username: 'john', age: 22 });
db.insertOne('usersDB', 'users', { username: 'jane', age: 30 });

// Update one
db.updateOne('usersDB', 'users', { username: 'john' }, { age: 23 });

// Find users
const results = db.find('usersDB', 'users', { age: 23 });
console.log(results);

// Delete one
db.deleteOne('usersDB', 'users', { username: 'jane' });

```

----------

## 💡 Ideal For

-   Node.js scripts or tools
    
-   Electron apps
    
-   CLIs
    
-   Offline storage
    
-   Rapid prototyping
    
-   Educational use
    

----------

## 🧑‍💻 Author

**Adithyan**  
GitHub: [@adithyan1507](https://github.com/adithyan1507)

----------

## 📄 License

MIT License

```
Would you like me to generate this as a file and zip it for you? Or prepare a GitHub-ready release with `package.json` and `README.md` included?

```