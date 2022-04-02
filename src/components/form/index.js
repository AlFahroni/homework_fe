import React from "react";

const FormPlaylist = ({onSubmit}) => {
    return(
        <form action="" onSubmit={onSubmit}>
            <h1>Create Playlist</h1>
            <label htmlFor="name">Title</label>
            <input 
                className="search-input" 
                type="text" 
                name="title" 
                id="name"
                placeholder="title"
                minLength={10}
            />
            <label htmlFor="description">Description</label>
            <textarea
                className="desc-bar"
                type="text"
                name="description"
                id="desc"
                placeholder="description"
            />
            <button type='submit'>Create a Playlist</button>
        </form>
    )
}

export default FormPlaylist;