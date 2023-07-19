package main

// https://go.dev/doc/tutorial/web-service-gin

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	// "os"
	"net/http"

    "github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {
	// Setup connection to the database
	setDB()
	// Setup gin for http request and response
	router := gin.Default();
	// Set GET routes
	router.GET("/user/:id", GETuser)
	router.GET("/games/:id", GETgames)
	router.GET("/completed_lessons/:id", GETcompletedLessons)
	router.GET("/lessons", GETlessons)
	// Set POST routes
	router.POST("/new_user", POSTcreateUser)
	// Tell the server to start listening
	router.Run("localhost:8080")
}

func setDB() (bool){
	// Connection properties
	cfg := mysql.Config{
		User:   os.Getenv("DBUSER"),// want to use these but not working (sets them locally, don't want to upload password to github)
		Passwd: os.Getenv("DBPASS"),// want to use these but not working (sets them locally, don't want to upload password to github)
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "codegambit",
		AllowNativePasswords: true,
	}
	
	// Get database handle
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
		return false
	}
	// Ping database to ensure connection
	pingErr :=   db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
		return false
	}
	fmt.Println("Connected!\n")
	return true
}

func POSTcreateUser(c *gin.Context) {
	var newUser User

	if err := c.BindJSON(&newUser); if err != nil {
		c.IndentedJSON(http.StatusUnprocessableEntity, gin.H{"message":"user could not be created"})
		return
	}

	// createUser returns the id int64, but check the error
	newId, err := createUser(newUser)
	if err != nil {
		c.IndentedJSON(, gin.H{"message": err})
		return
	}
	// Fill user data with returned ID
	newUser.Id = newId
	c.IndentedJSON(http.StatusCreated, newUser)
}

// Create a user account in the data base
// returns the id of the user entry or an error message
func createUser(user User) (int64, error) {
	result, err := db.Exec("INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?)", user.Name, user.Email, user.Password)
	if err != nil {
		return 0, fmt.Errorf("createUser: %v", err)
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("createUser: %v", err)
	}
	return id, nil
}

// Callback function for GET http user request
// calls getUserGames
func GETuser(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":"invalid user id"})
		return
	}
	user, err := getUserByID(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":err})
		return
	if user.Id == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message":"user not found"})
		return
	}
	c.IndentedJSON(http.StatusFound, user)
}

// Find a user by a given ID
// return the corresponding row from the Users table
func getUserByID(id int64) (User, error){
	var user User
	// Query for a single row with the given user id
	row := db.QueryRow("SELECT id, name, email FROM Users WHERE id = ?", id)
	if err := row.Scan(&user.Id, &user.Name, &user.Email); err != nil {
		// Return an error if no row is found or anything goes wrong
		if err == sql.ErrNoRows {
			return user, fmt.Errorf("(id == %d) no user was found", id)
		}
		return user, fmt.Errorf("(id == %d) %v", id, err)
	}
	// Else; return the user info
	return user, nil
}

// Callback function for GET http user's games request
// calls getUserGames
func GETgames(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":"invalid user id"})
		return
	}
	games, err := getUserGames(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":err})
		return
	if len(games) == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message":"no games found"})
		return
	}
	c.IndentedJSON(http.StatusOK, games)
}

// Return a list of structs containing the games a user has played
func getUserGames(id int64) ([]Game, error){

	var games []Game

	// Query games for desired user
	rows, err := db.Query("SELECT * FROM Games WHERE w_id = ? OR b_id = ?", id, id)
	// Return null if error occurs
	if err != nil {
		return games, fmt.Errorf("(id == %d) %v", id, err)
	}
	defer rows.Close() // Release any data being held on close 
	// Actually store queried data in the games variable
	for rows.Next() {
		var game Game
		// Read in a single row to the games variable and check for errors
		if err := rows.Scan(
			&game.Id,
			&game.W_id,
			&game.B_id,
			&game.Winner_id,
			&game.Date_played,
			&game.Moves,
		); err != nil {
			return games, fmt.Errorf("(id == %d) %v", id, err)
		}
		games = append(games, game)
	}
	// Final error check for incomplete results
	if err:= rows.Err(); err != nil {
		return games, fmt.Errorf("(id == %d) %v", id, err)
	}
	// Else; return the games and no error
	return games, nil
}

func GETcompletedLessons(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":"invalid user id"})
		return
	}
	lessons, err := getUserCompletedPuzzles(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":err})
		return
	if len(lessons) == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message":"no lessons found"})
		return
	}
	c.IndentedJSON(http.StatusOK, lessons)
}

func getUserCompletedPuzzles(id int64) ([]CompletedLesson, error) {
	var lessons []CompletedLesson

	// Query completed lessons for desired user
	rows, err := db.Query("SELECT * FROM Completed_Lessons WHERE user_id = ?", id)
	// Return null if error occurs
	if err != nil {
		return lessons, fmt.Errorf("(id == %d) %v", id, err)
	}
	defer rows.Close() // Release any data being held on close 
	// Actually store queried data in the lessons variable
	for rows.Next() {
		var lesson CompletedLesson
		// Read in a single row to the lessons variable and check for errors
		if err := rows.Scan(
			&lesson.Id,
			&lesson.Lesson_id,
			&lesson.User_id,
		); err != nil {
			return lessons, fmt.Errorf("(id == %d) %v", id, err)
		}
		lessons = append(lessons, lesson)
	}
	// Final error check for incomplete results
	if err:= rows.Err(); err != nil {
		return lessons, fmt.Errorf("(id == %d) %v", id, err)
	}
	// Else; return the lessons and no error
	return lessons, nil
}

func GETlessons(c *gin.Context) {
	lessons, err := getLessons()
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message":err})
		return
	if len(lessons) == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message":"no lessons found"})
		return
	}
	c.IndentedJSON(http.StatusOK, lessons)
}

func getLessons() ([]Lesson, error) {
	var lessons []Lesson

	// Query lessons for desired user
	rows, err := db.Query("SELECT * FROM Lessons")
	// Return null if error occurs
	if err != nil {
		return lessons, fmt.Errorf("getLessons() %v", err)
	}
	defer rows.Close() // Release any data being held on close 
	// Actually store queried data in the lessons variable
	for rows.Next() {
		var lesson CompletedLesson
		// Read in a single row to the lessons variable and check for errors
		if err := rows.Scan(
			&lesson.Id,
			&lesson.Category,
			&lesson.Rating,
			&lesson.Title,
			&lesson.FEN,
			&lesson.Playing_as,
			&lesson.Moves,
			&lesson.Goal,
		); err != nil {
			return lessons, fmt.Errorf("getLessons() %v", err)
		}
		lessons = append(lessons, lesson)
	}
	// Final error check for incomplete results
	if err:= rows.Err(); err != nil {
		return lessons, fmt.Errorf("getLessons() %v", err)
	}
	// Else; return the lessons and no error
	return lessons, nil
}

// Notes:
// * fmt.Errorf vs log.Fatal()
// - errorf seems to be for if the program can continue, fatal entierly stops running
//   maybe error is better for testing but idk how fatal will affect users if they ignore what
//   caused it and just try to do something else which should be fine