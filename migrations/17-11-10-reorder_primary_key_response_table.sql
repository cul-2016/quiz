ALTER TABLE responses DROP constraint responses_pkey;
ALTER TABLE responses ADD primary key (question_id, user_id);