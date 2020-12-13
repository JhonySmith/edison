const admin = require('firebase-admin');
var serviceAccount = require('./edison-a2ee6-firebase-adminsdk-9ve5t-51ff70efb0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://edison-a2ee6-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.database();

const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});

const UsersToSecondPhase = () => {
  let currentUsers = [];
  let currentUsersId = [];
  let currentUsersAll = [];

  db.ref('event/firstPhaseUsers').on('value', (snapshot) => {
    currentUsersAll = snapshot.val();
    currentUsers = Object.values(snapshot.val());
    currentUsersId = Object.keys(snapshot.val());
  });

  const getUniqArr = (data, param) => {
    const datas = new Set(data.map((dt) => dt[param]));
    return [...datas];
  };

  const times = getUniqArr(currentUsers, 'time');

  let winAnswer = {
    answer: '',
    count: 0,
    time: '',
  };

  times.forEach((time) => {
    const filteredByTime = currentUsers.filter((element) => element.time === time);

    const uniqAnswer = getUniqArr(filteredByTime, 'event');

    uniqAnswer.forEach((answer) => {
      const filteredByAnswer = filteredByTime.filter((element) => element.answer === answer);

      if (filteredByAnswer.length > winAnswer.count) {
        winAnswer.count = filteredByAnswer.length;
        winAnswer.answer = answer;
        winAnswer.time = time;
      }
    });
  });

  currentUsersId.forEach((id) => {
    if (
      currentUsersAll[id].time === winAnswer.time &&
      currentUsersAll[id].event === winAnswer.answer
    ) {
      db.ref('event/secondPhaseUsers/' + { id }).set({
        user: currentUsersAll[id].user,
        answer: 'yes',
      });
    }
  });
};

let intervalFirst;
let intervalSecond;

app.post('/stopEvent', (request, response) => {
  clearTimeout(intervalSecond);
  clearTimeout(intervalFirst);
  db.ref('event/config/')
    .update({
      secondPhaseTimeLeft: 0,
    })
    .then(() => {
      db.ref('event/').set({
        admin: 0,
        config: {
          firstPhaseTimeLeft: 0,
          phase: 'startEvent',
          secondPhaseTimeLeft: 0,
        },
        firstPhaseUsers: 0,
        secondPhaseUsers: 0,
      });
    });
});

app.post('/startEvent', (request, response) => {
  let timeLeftFirst = request.body.timeout.first;
  let admin = request.body.admin;
  db.ref('event/config').update({
    firstPhaseTimeLeft: timeLeftFirst,
  });
  db.ref('event/').update({
    admin: admin,
  });
  let timeLeftSecond = request.body.timeout.second;

  db.ref('event/config/').update({
    phase: request.body.states.FIRST_PHASE,
  });

  function startSecondEvent() {
    intervalSecond = setInterval(() => {
      db.ref('event/config/')
        .update({
          secondPhaseTimeLeft: timeLeftSecond,
        })
        .then(() => {
          if (timeLeftSecond <= 0) {
            db.ref('event/').set({
              admin: 0,
              config: {
                firstPhaseTimeLeft: 0,
                phase: 'startEvent',
                secondPhaseTimeLeft: 0,
              },
              firstPhaseUsers: 0,
              secondPhaseUsers: 0,
            });
            clearInterval(intervalSecond);
          }

          timeLeftSecond = timeLeftSecond - 60000;
        });
    }, 60000);
  }
  // Запускает отсчет для первой фазы
  intervalFirst = setInterval(() => {
    timeLeftFirst = timeLeftFirst - 60000;
    db.ref('event/config/')
      .update({
        firstPhaseTimeLeft: timeLeftFirst,
      })
      .then(() => {
        if (timeLeftFirst <= 0) {
          db.ref('event/config/').update({
            phase: request.body.states.FIRST_PHASE_END,
          });
          // Запускает отсчет для второй фазы
          UsersToSecondPhase();
          startSecondEvent();
          clearInterval(intervalFirst);
        }

        timeLeftFirst = timeLeftFirst - 60000;
      });
  }, 60000);
});
