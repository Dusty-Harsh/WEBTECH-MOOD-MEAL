const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());


const users = [];
const mealHistory = {}; 
const JWT_SECRET = 'your-super-secret-key-that-should-be-in-an-env-file'; 

const recipes = {
    stressed: {
        description: "Foods rich in Magnesium and Vitamin C can help lower cortisol levels.",
        recipes: [
            { title: "Avocado & Spinach Smoothie", image: "https://images.unsplash.com/photo-1505252585461-14560997cd21?q=80&w=2070", ingredients: ["Avocado", "Spinach", "Banana", "Almond Milk"], instructions: "Blend all ingredients until smooth." },
            { title: "Dark Chocolate & Nut Mix", image: "https://images.unsplash.com/photo-1585252579163-6fe395c52c23?q=80&w=2070", ingredients: ["70% Dark Chocolate", "Almonds", "Walnuts"], instructions: "Combine in a bowl and enjoy a handful." }
        ]
    },
    tired: {
        description: "Complex carbs and lean proteins provide sustained energy.",
        recipes: [
            { title: "Quinoa Salad with Chickpeas", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070", ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Lemon Vinaigrette"], instructions: "Mix cooked quinoa with other ingredients." },
            { title: "Oatmeal with Berries & Seeds", image: "https://images.unsplash.com/photo-1586948633324-b15398287c88?q=80&w=1964", ingredients: ["Rolled Oats", "Mixed Berries", "Chia Seeds", "Honey"], instructions: "Cook oats and top with berries and seeds." }
        ]
    },
    happy: {
        description: "Foods that support serotonin production can enhance a good mood.",
        recipes: [
            { title: "Grilled Salmon with Asparagus", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070", ingredients: ["Salmon Fillet", "Asparagus", "Olive Oil", "Lemon"], instructions: "Grill salmon and asparagus, then squeeze lemon over top." },
            { title: "Banana Oat Pancakes", image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?q=80&w=1964", ingredients: ["Banana", "Oats", "Egg", "Cinnamon"], instructions: "Blend ingredients and cook on a griddle." }
        ]
    },
    focused: {
        description: "Omega-3 fatty acids and antioxidants are great for brain health.",
        recipes: [
            { title: "Blueberry & Walnut Smoothie", image: "https://images.unsplash.com/photo-1502741224143-9137135f385c?q=80&w=1965", ingredients: ["Blueberries", "Walnuts", "Greek Yogurt", "Flaxseed"], instructions: "Blend all ingredients until creamy." },
            { title: "Green Tea & Edamame", image: "https://images.unsplash.com/photo-1576587993060-f65345672954?q=80&w=2070", ingredients: ["Green Tea", "Steamed Edamame", "Sea Salt"], instructions: "Brew tea and enjoy with a side of lightly salted edamame." }
        ]
    }
};


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
};


app.post('/api/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), userName, email, password: hashedPassword };
        users.push(newUser);
        
        console.log('Users:', users); 
        res.status(201).json({ message: "User created successfully!" });

    } catch {
        res.status(500).json({ message: "Error creating user." });
    }
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (user == null) {
        return res.status(400).json({ message: 'Cannot find user' });
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
           
            const accessToken = jwt.sign({ id: user.id, name: user.userName }, JWT_SECRET, { expiresIn: '1d' });
            res.json({ token: accessToken, userName: user.userName });
        } else {
            res.status(401).json({ message: 'Not Allowed - Incorrect Password' });
        }
    } catch {
        res.status(500).send();
    }
});


app.get('/api/recommendations/:mood', verifyToken, (req, res) => {
    const mood = req.params.mood.toLowerCase();
    const recommendation = recipes[mood];

    if (recommendation) {
        res.json(recommendation);
    } else {
        
        res.status(404).json(recipes['happy']);
    }
});


app.get('/api/history', verifyToken, (req, res) => {
    const userId = req.user.id;
    const userHistory = mealHistory[userId] || [];
    res.json(userHistory);
});


app.post('/api/history', verifyToken, (req, res) => {
    const userId = req.user.id;
    const { mood, recipeTitle } = req.body;

    if (!mealHistory[userId]) {
        mealHistory[userId] = [];
    }
    
    const newEntry = {
        mood,
        recipeTitle,
        date: new Date()
    };

    mealHistory[userId].unshift(newEntry); 
    console.log('History:', mealHistory); 

    res.status(201).json(newEntry);
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});