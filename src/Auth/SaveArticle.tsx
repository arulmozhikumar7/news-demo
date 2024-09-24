import { db } from "./firebase" // Import Firestore instance
import { doc, setDoc } from "firebase/firestore";

import { auth } from "./firebase";

const saveArticle = async (article: any) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("User is not signed in");
        return;
    }

    try {
        const articleRef = doc(db, "users", user.uid, "savedArticles", article.title); // Unique doc per user and article
        await setDoc(articleRef, {
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage || article.image,
            source: article.source.name,
            publishedAt: article.publishedAt,
            savedAt: new Date().toISOString()
        });
        console.log("Article saved successfully!");
    } catch (error) {
        console.error("Error saving article: ", error);
    }
};


export default saveArticle;