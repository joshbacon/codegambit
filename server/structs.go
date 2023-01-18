package main

// This file contains struct representations of a row
// for each table in the database

type User struct {
	id int
	name string
	email string
	password string
}

type Game struct {
	id int
	w_id int
	b_id int
	winner int
	date_played string
}

type CompletedLesson struct {
	id int
	lesson_id int
	user_id int
}

type Lesson struct {
	id int
	category string
	rating int
	title string
	FEN string
	playing_as string
	moves string
	goal string
}
