CREATE DATABASE todo_livesolve;

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	tasks VARCHAR (100),
	is_completed BOOLEAN DEFAULT FALSE
);

INSERT into tasks (tasks)
VALUES ('fun thing to do');