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
        return res.render("index.ejs", { name: "", characters: [] });
    }

    try {
        const response = await axios.get(`${urlBase}/v1/characters`, {
            params: { "filter[name_cont]": name },  
        });
        const characters = response.data.data.map((char) => char.attributes); 
        

        if (!characters) {
            return res.render("index.ejs", { name, characters: [] });
        }
        
        res.render("index.ejs", { name, characters } ) 
    } catch (error) {
        console.log("Error fetching the character", error);
        res.status(500).send("No character found");
    }
})











app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);    
})