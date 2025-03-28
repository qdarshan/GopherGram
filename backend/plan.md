# GOPHERGRAM
## routes
- /home (contains the feed)
- /compose/post (create a post)
- /{username} (displays profile of user, with all his profile)
- /{username}/status/{id} (particular post of a user)
- /delete/{id} (delete post)
- /edit/{id} (edit post)
- /{username}/upvote/{id} (upvote post)
- /{username}/downvote/{id} (downvote post)

### home handler
- retrieve all the public posts
- create algorithm to sort/recommend
- implement pagination

### compose post handler
- Identify the user making the request
- validate the payload
- verify user is authenticated
- if authorized, save post in the database
- Send a response back to the user, indicating whether the save was successful or if there was an error.

### view post handler
- check if the post is public or private with the id
- if public, return post
- if private, only owner can access it

### delete handler
- Identify the user making the request
- Access the database to find the post with the given id.
- Verify if the requesting user is the owner of the post or has the necessary permissions to delete it.
- If authorized, delete the post from the db.
- Send a response back to the user, indicating whether the deletion was successful or if there was an error.

### profile handler
- Access the database to find the user with the matching username.
- Retrieve the user's profile information (e.g., their posts, bio, etc.).
- Format this information into a JSON response.
- Send the formatted response back to the user.
- Handle the case where no user with that username exists (e.g., by displaying a "user not found" page or returning a 404 error).