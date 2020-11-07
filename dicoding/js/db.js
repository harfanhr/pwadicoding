var dbPromised = idb.open("team-soccer", 1, function(upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(article) {
        console.log(id)
        resolve(article);
      });
  });
}

function deletesitem(team) {
  console.log(team.id)
dbPromised.then(function(db) {
  let tx = db.transaction('teams', 'readwrite');
  let store = tx.objectStore('teams');
  store.delete(team.id);
  return tx.complete;
}).then(function() {
  console.log('Item deleted');
});
}
