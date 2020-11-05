package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.PathPrefix("/templates/").Handler(http.StripPrefix("/templates/", http.FileServer(http.Dir("./templates"))))
	r.HandleFunc("/", index)

	port := ":8080"
	fmt.Println("Listening on", port)
	http.ListenAndServe(port, r)
}

func index(w http.ResponseWriter, r *http.Request) {
	template, err := ioutil.ReadFile("./templates/index.html")

	if err != nil {
		panic(err)
	}
	w.Write(template)
}
