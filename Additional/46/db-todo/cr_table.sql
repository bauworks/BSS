create table todo_items(
	id serial,
	title varchar(40),
	done_flg numeric(1) default 0,
	time_limit date
);
