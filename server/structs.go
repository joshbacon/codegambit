package main

// This file contains struct representations of a row
// for each table in the database

type User struct {
	Id int64 `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type Game struct {
	Id int64 `json:"id"`
	W_id int64 `json:"w_id"`
	B_id int64 `json:"b_id"`
	Winner_id int64 `json:"winner_id"`
	Date_played string `json:"date_played"`
	Moves string `json:"moves"`
}

type CompletedLesson struct {
	Id int64 `json:"id"`
	Lesson_id int `json:"lesson_id"`
	User_id int64 `json:"user_id"`
}

type Lesson struct {
	Id int64 `json:"id"`
	Category string `json:"category"`
	Rating int `json:"rating"`
	Title string `json:"title"`
	FEN string `json:"FEN"`
	Playing_as string `json:"playing_as"`
	Moves string `json:"moves"`
	Goal string `json:"goal"`
}
