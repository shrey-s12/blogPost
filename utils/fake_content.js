// // npm install faker
// const mongoose = require('mongoose');
// const { type } = require('os');
// const Schema = mongoose.Schema;
// const faker = require("faker")


// const USER_NAME = "shreys12";
// const PASSWORD = "Shrey1210";
// const DB_NAME = "merndb";

// const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.lidry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

// const promObj = mongoose.connect(dbURI);
// promObj.then((result)=>{
//     console.log("Connected");
// });

// const blogpost = new Schema({
//     title: { type: String, required: true },
//     summery: { type: String, require: true },
//     content: { type: String, required: true },
//     author: { type: String, required: true },
// }, { timestamps: true });

// const BlogPost = mongoose.model("BlogPost", blogpost, "blogposts");

// // Helper function to capitalize the first letter of each word in a string
// function capitalizeFirstLetterOfEachWord(string) {
//     return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// }

// // Helper function to capitalize the first letter of a string
// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// for(let i = 0; i < 100; i++) {
//     let title = faker.lorem.words(5);
//     title = capitalizeFirstLetterOfEachWord(title); // Capitalize the first letter of the title
//     const summary = capitalizeFirstLetter(faker.lorem.words(10));
    
//     // Generate paragraphs with more words by increasing the number of sentences per paragraph
//     const paragraphs = Array.from({ length: 25 }, () => faker.lorem.sentences(10)).join('\n\n'); // 10 sentences per paragraph
//     const content = paragraphs.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join(''); // Wrap each paragraph in <p> tags
    
//     const author = faker.name.findName();
//     const blogpost = new BlogPost({ title, summary, content, author });
//     blogpost.save()
//         .then((result) => {
//             console.log(`New blog added: ${result.title}`);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }