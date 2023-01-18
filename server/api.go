package main

// https://go.dev/doc/tutorial/web-service-gin

import (
	"database/sql"
	"fmt"
	"log"
	// "os"
	
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {

	// Setup connection to the database
	setDB()

	num := 1

	user1, err := userByID(num)
	if err != nil {
		fmt.Println("userByID failed: ", err)
	}
	fmt.Println("User ", num, ":", user1)
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
	fmt.Println("Connected!")
	return true
}

// Find a user by a given ID
// return the corresponding row from the Users table
func userByID(id int) (User, error){
	var user User

	// Query for desired user
	row, err := db.Query("SELECT id, name, email FROM Users WHERE id = ?", id)
	// Return null if error occurs
	if err != nil {
		return User{}, fmt.Errorf("(id == %d) %v", id, err)
	}
	defer row.Close() // release any data held in row 
	// Actually store queried data in the user variable
	for row.Next() {
		// Read in a single row to the user variable and check for errors
		if err := row.Scan(&user.id, &user.name, &user.email); err != nil {
			return User{}, fmt.Errorf("(id == %d) %v", id, err)
		}
	}
	// Final error check for incomplete results
	if err:= row.Err(); err != nil {
		return User{}, fmt.Errorf("(id == %d) %v", id, err)
	}
	// Check if query returned an empty user
	if user.id == 0 {
		return User{}, fmt.Errorf("(id == %d) no user was found", id)
	}
	// Else; return the user and no error
	return user, nil
}

// NEEDED FUNCTIONS
// - completedPuzzles(user_id); return... what?
// - numGames(user_id); return [wins int, loses int, total int]
// - definetly more but idk yet
// - update username??


// Notes:
// * fmt.Errorf vs log.Fatal()
// - errorf seems to be for if the program can continue, fatal entierly stops running
//   maybe error is better for testing but idk how fatal will affect users if they ignore what
//   caused it and just try to do something else which should be fine