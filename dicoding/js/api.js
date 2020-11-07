let base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getTeams() {

  if ('caches' in window) {
    caches.match(base_url + "competitions/PL/teams").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
            data.teams.forEach(function(article) {
            teamsHTML += `
            <div class = "col s12 m6 xl4">
            <div class="card large" style="background-color:#38003c">
            <section>
              <a href="./article.html?id=${article.id}">
                <div class="card-image waves-effect waves-block waves-light" style="background-color:white">
                  <img src="${article.crestUrl}" alt ="Logo/Crest Club"/>
                </div>
              </a>
              <div class="card-content">
                <span class="card-title" style="color:white">Nama Club: ${article.name}</span>
                <p style="color:white">Alamat: ${article.address}</p>
                <p style="color:white">Phone: ${article.phone}</p>
                <p style="color:white">Website: ${article.website}</p>
                <p style="color:white">Venue: ${article.venue}</p>
              </div>
              </section>
              </div>
              </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
        })
      }
    })
  }

  fetch(base_url + "competitions/PL/teams", {
   method: 'GET',
   headers: {'X-Auth-Token': '985a5b53c06941269cdd39b2e46357d8'},
   dataType: 'json',
 })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = "";
        data.teams.forEach(function(article) {
        teamsHTML += `
        <div class = "col s12 m6 xl4">
        <div class="card large" style="background-color:#38003c">
        <section>
          <a href="./article.html?id=${article.id}">
            <div class="card-image waves-effect waves-block waves-light" style="background-color:white">
              <img src="${article.crestUrl}" alt ="Logo/Crest Club"/>
            </div>
          </a>
          <div class="card-content">
            <span class="card-title" style="color:white">Nama Club: ${article.name}</span>
            <p style="color:white">Alamat: ${article.address}</p>
            <p style="color:white">Phone: ${article.phone}</p>
            <p style="color:white">Website: ${article.website}</p>
            <p style="color:white">Venue: ${article.venue}</p>
          </div>
          </section>
          </div>
          </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTopScorer() {

  if ('caches' in window) {
    caches.match(base_url + "competitions/PL/scorers").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let articlesHTML = "";
            data.scorers.forEach(function(article) {
            articlesHTML += `
            <tr>
              <td style="background-color:#00ff85"><a href="./player.html?id=${article.player.id}">${article.player.name}</a></td>
              <td style="background-color:#00ff85">${article.team.name}</td>
              <td style="background-color:#00ff85">${article.numberOfGoals}</td>
            </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        })
      }
    })
  }

  fetch(base_url + "competitions/PL/scorers", {
   method: 'GET',
   headers: {'X-Auth-Token': '985a5b53c06941269cdd39b2e46357d8'},
   dataType: 'json',
 })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
        data.scorers.forEach(function(article) {
        articlesHTML += `
        <tr>
          <td style="background-color:#00ff85"><a href="./player.html?id=${article.player.id}">${article.player.name}</a></td>
          <td style="background-color:#00ff85">${article.team.name}</td>
          <td style="background-color:#00ff85">${article.numberOfGoals}</td>
        </tr>


            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getPlayerById() {
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "players/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
          console.log(data);
          // Menyusun komponen card artikel secara dinamis
          var articleHTML = `
              <div class="card" style="background-color:#38003c">
                <div class="card-content">
                  <span class="card-title" style="color:white">${data.name}</span>
                  <p style="color:white">Tanggal Lahir: ${data.dateOfBirth}</p>
                  <p style="color:white">Nationality: ${data.nationality}</p>
                  <p style="color:white">Position: ${data.position}</p>
                </div>
              </div>
            `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        })
      }
    })
  }


  fetch(base_url + "players/" + idParam , {
   method: 'GET',
   headers: {'X-Auth-Token': '985a5b53c06941269cdd39b2e46357d8'},
   dataType: 'json',
 })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
      <div class="card" style="background-color:#38003c">
        <div class="card-content">
          <span class="card-title" style="color:white">${data.name}</span>
          <p style="color:white">Tanggal Lahir: ${data.dateOfBirth}</p>
          <p style="color:white">Nationality: ${data.nationality}</p>
          <p style="color:white">Position: ${data.position}</p>
        </div>
      </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}

function getTeamsById() {
   return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
          console.log(data);
          // Menyusun komponen card artikel secara dinamis
          let teamsHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" alt ="Logo/Crest Club"/>
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <p>Alamat: ${data.address}</p>
                  <p>Venue: ${data.venue}</p>
                  <p>Asal: ${data.area.name}</p>
                </div>
              </div>
            `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = teamsHTML;
            resolve(data);
        });
      }
    });
  }

  fetch(base_url + "teams/" + idParam , {
   method: 'GET',
   headers: {'X-Auth-Token': '985a5b53c06941269cdd39b2e46357d8'},
   dataType: 'json',
 })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" alt ="Logo/Crest Club" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>Alamat: ${data.address}</p>
              <p>Venue: ${data.venue}</p>
              <p>Asal: ${data.area.name}</p>
            </div>
          </div>
          </div>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamsHTML;
      resolve(data);
    });
    });
}


function getSavedArticles() {
  getAll().then(function(articles) {

    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articles.forEach(function(article) {
      articlesHTML += `
      <div class = "col s12 m6 xl4">
      <div class="card large" style="background-color:#38003c">
      <a href="./article.html?id=${article.id}&saved=true">
        <div class="card-image waves-effect waves-block waves-light" style="background-color:white">
          <img src="${article.crestUrl}" alt ="Logo/Crest Club" />
        </div>
        </a>
        <div class="card-content">
          <span class="card-title" style="color:white">${article.name}</span>
          <p style="color:white">Alamat: ${article.address}</p>
          <p style="color:white">Venue: ${article.venue}</p>
          <p style="color:white">Asal: ${article.area.name}</p>
        </div>
      </div>
      </div>
                `;

    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saved").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
  //var idParam = urlParams.get("id");
  getById(idParam).then(function(article) {
    articleHTML = '';
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.crestUrl}" alt ="Logo/Crest Club" />
      </div>
      <div class="card-content">
      <span class="card-title">${article.name}</span>
      <p>Alamat: ${article.address}</p>
      <p>Venue: ${article.venue}</p>
      <p>Asal: ${article.area.name}</p>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

function getDeletedItems() {
  return new Promise(function(resolve, reject) {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
  //var idParam = urlParams.get("id");
  getById(idParam).then(function(article) {
    articleHTML = '';
    var articleHTML = `

    <div class="card">
      <p> sudah dihapus <p>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
    resolve(article);
  });
});
}
