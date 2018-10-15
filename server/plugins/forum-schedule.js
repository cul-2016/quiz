const CronJob = require('cron').CronJob;
const query = require('../lib/query.js');
const getForumModules = require('../lib/queries.json').getForumModules;
const createTopic = require('../lib/forum').createTopic;
const getTotalScoresAndTrophies = require('../lib/getTotalScoresAndTrophies.js');
const getLeaderboardText = require('../lib/forum/getLeaderboardText.js');

exports.register = (server, options, next) => {
  const { pool } = server.app;

  // Posts each module's leaderboard to the forum every Friday evening
  const job = new CronJob('00 00 18 * * 5', function() {
    query(pool, getForumModules, [], function(err, res) {
      res.rows.forEach(el => {
        if (el.forum_cid) {
          getTotalScoresAndTrophies(pool, el.module_id, function(err, res) {
            if (res.length && res[0].total_score > 0) {
              createTopic(el.forum_cid, 'Weekly leaderboard', getLeaderboardText(res), function(err, res) {
                if (err) console.log(err);
              });
            }
          })
        }
      })
    })
  });

  job.start();

  next();
}

exports.register.attributes = { pkg: { name: 'forum-schedule' } };
