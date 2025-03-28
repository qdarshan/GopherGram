package handlers

import (
	"fmt"
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "welcome to the home feed")
}

func ComposePostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "compose your posts")
}

func DeletePostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprintf(w, "delete your post: "+id)
}

func EditPostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	fmt.Fprintf(w, "edit your post: "+id)
}

func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	fmt.Fprintf(w, "username: "+username)
}

func ViewPostHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	id := r.PathValue("id")
	fmt.Fprintf(w, "view post username: "+username+" id: "+id)
}

func UpvoteHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	id := r.PathValue("id")
	fmt.Fprintf(w, "upvote username: "+username+" id: "+id)
}

func DownvoteHandler(w http.ResponseWriter, r *http.Request) {
	username := r.PathValue("username")
	id := r.PathValue("id")
	fmt.Fprintf(w, "downvote username: "+username+" id: "+id)
}
