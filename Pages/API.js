async function login(username) {
  var jwtToken = "";
  console.log(username);
  try {
    var rq = await fetch("http://10.165.1.138:8080/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    var rs = await rq.json();

    jwtToken = await rs.token;
    alert("Logged in successfully");
  } catch (e) {
    console.log(e);
    console.log("------------------------");
    alert("Login Failed");
  }
  return jwtToken;
}

var createFilm = (jwtToken, title, rate) => {
  try {
    fetch("http://10.165.1.138:8080/api/v1/films", {
      method: "POST",
      body: JSON.stringify({
        name: title,
        rating: rate,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    }).then((resp) => {
      if (resp.status == 200) {
        alert("Film successfully added!");
      } else {
        // resp.statusText("403 - Forbidden access");
        alert(resp.status + " - " + resp.statusText);
      }
    });
  } catch (e) {
    console.log(e);
    console.log(".........................");
  }

  return false;
};

async function getFilms() {
  var filmsData = [];

  try {
    var rq = await fetch("http://10.165.1.138:8080/api/v1/films", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    var rs = await rq.json();
    filmsData = await rs;
  } catch (e) {
    console.log(e);
    console.log(".........................");
  }

  return filmsData;
}

var UpdateFilm = (jwtToken, title, rate) => {
  try {
    fetch("http://10.165.1.138:8080/api/v1/films", {
      method: "PUT",
      body: JSON.stringify({
        name: title,
        rating: rate,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    }).then((resp) => {
      setTimeout(function () {
        if (resp.status == 200) {
          alert("Rating updated successfully!");
        } else {
          // resp.statusText("403 - Forbidden access");
          alert(resp.status + " - " + resp.statusText);
        }

        //        getFilms();
      }, 0);
    });
  } catch (e) {
    console.log(e);
    console.log(".........................");
  }

  return false;
};

export { login, createFilm, getFilms, UpdateFilm };
