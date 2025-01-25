import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

const urlBase = "https://api.potterdb.com";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { name: "", characters: [] })
});

app.get("/search-character", async (req, res) => {
    const name = req.query.name; 

    if (!name) {
        return res.render("searchCharacter.ejs", { name: "", characters: [] });
    }

    try {
        const response = await axios.get(`${urlBase}/v1/characters`, {
            params: { "filter[name_cont]": name },  
        });
        const characters = response.data.data.map((char) => char.attributes); 
        

        if (characters.length === 0) {
            return res.render("searchCharacter.ejs", { name, characters: [] });
        }
        
        return res.render("searchCharacter.ejs", { name, characters } ) 
    } catch (error) {
        console.log("Error fetching the character", error);
        res.status(500).send("No character found");
    }
})

app.get("/search-spell", async (req, res) => {
    const spell = req.query.spell; 

    if (!spell) {
        return res.render("searchSpell.ejs", { spell: "", spells: [] });
    }

    try {
        const response = await axios.get(`${urlBase}/v1/spells`, {
            params: { "filter[name_cont]": spell },  
        });
        const spells = response.data.data.map((spell) => spell.attributes); 
        

        if (spells.length === 0) {
            return res.render("searchSpell.ejs", { spell, spells: [] });
        }
        
        return res.render("searchSpell.ejs", { spell, spells } ) 
    } catch (error) {
        console.log("Error fetching the spell", error);
        res.status(500).send("No spell found");
    }
})

app.get("/search-book", async (req, res) => {
    const book = req.query.book; 

    if (!book) {
        return res.render("searchBook.ejs", { book: "", books: [] });
    }

    try {
        const response = await axios.get(`${urlBase}/v1/books`, {
            params: { "filter[title_cont]": book },  
        });
        const books = response.data.data.map((book) => book.attributes); 
        

        if (books.length === 0) {
            return res.render("searchBook.ejs", { book, books: [] });
        }
        
        return res.render("searchBook.ejs", { book, books } ) 
    } catch (error) {
        console.log("Error fetching the book", error);
        res.status(500).send("No book found");
    }
})

app.get("/search-movie", async (req, res) => {
    const movie = req.query.movie; 

    if (!movie) {
        return res.render("searchMovie.ejs", { movie: "", movies: [] });
    }

    try {
        const response = await axios.get(`${urlBase}/v1/movies`, {
            params: { "filter[title_cont]": movie },  
        });
        const movies = response.data.data.map((movie) => movie.attributes); 
        

        if (movies.length === 0) {
            return res.render("searchMovie.ejs", { movie, movies: [] });
        }
        
        return res.render("searchMovie.ejs", { movie, movies } ) 
    } catch (error) {
        console.log("Error fetching the movie", error);
        res.status(500).send("No movie found");
    }
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})