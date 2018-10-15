const defaultPrivileges = [
  'find',
  'read',
  'topics:read',
  'topics:create',
  'topics:reply',
  'topics:tag',
  'posts:edit',
  'posts:history',
  'posts:delete',
  'posts:upvote',
  'posts:downvote',
  'topics:delete'
];

const defaultGroupPrivileges = defaultPrivileges.map(p => `groups:${p}`);

module.exports = {
  user: defaultPrivileges,
  group: defaultGroupPrivileges
}
