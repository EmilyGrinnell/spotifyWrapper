module.exports = function(id) {
    return this.makeRequest(`${id ? `users/${id}` : "me"}`);
    //Get a user's profile, defaulting to the user's own if none is provided
};