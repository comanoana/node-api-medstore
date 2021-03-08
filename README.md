# node-api

Node JS CRUD API example

- [x] store info in JSON file
- [x] store info in DB (MYSQL)

## Install

```sh
git clone (https://github.com/comanoana/node-api-medstore.git)
cd node-api
npm install
```

## JS Usage

```sh
npm run devstart
```

### JSON file as storage

Team members are stored inside [data/store.json](data/store.json)

```js
// GET medstore-json
fetch("http://localhost:3000/medstore-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

// POST medstore-json/create
fetch("http://localhost:3000/medstore-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ drugNAme: "drugName", category: "category", expirationDay: "expDate", link:"prospect", amount: "amount" })
});

// DELETE medstore-json/delete
fetch("http://localhost:3000/medstore-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT medstore-json/update
fetch("http://localhost:3000/medstore-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
  drugNAme: "drugName",
   category: "category", 
    expirationDay: "expDate", 
    link:"prospect", 
    amount: "amount"
  })
});
```

### DB (MySQL) as storage

Team members are stored mysql

- configure user & pass for mysql connection [routes/medstore-db.js](routes/medstore-db.js)
- create a database named **medstore**
- run [http://localhost:3000/medstore/install](http://localhost:3000/medstore/install)
- now you can any other CRUD operations (the same as for json but change url "medstore-json" -> "medstore")
