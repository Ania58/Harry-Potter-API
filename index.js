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
        

        if (!characters) {
            return res.render("searchCharacter.ejs", { name, characters: [] });
        }
        
        res.render("searchCharacter.ejs", { name, characters } ) 
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
        

        if (!spells.length === 0) {
            return res.render("searchSpell.ejs", { spell, spells: [] });
        }
        
        res.render("searchSpell.ejs", { spell, spells } ) 
    } catch (error) {
        console.log("Error fetching the spell", error);
        res.status(500).send("No spell found");
    }
})










app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})