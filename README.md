# FriendFinder - Node and Express Servers

### Overview

"FriendFinder" is a compatibility-based application. This full-stack site will take in results from a users' survey, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match. 

This app uses Express to handle routing. This app has also been deployed via Heroku.


### Before You Begin

* Check out [this demo version of the site](https://friend-finder-fsf.herokuapp.com/). 

* The files are organized as such:

  ```
  FriendFinder
    - .gitignore
    - app
      - data
        - friends.js
      - public
        - home.html
        - survey.html
      - routing
        - apiRoutes.js
        - htmlRoutes.js
    - node_modules
    - package.json
    - server.js
  ```

### How the app was created:

1. The survey contains 10 questions. Answers use a scale from 1 to 5 based on how much the user agrees or disagrees with a question.

2. The `server.js` file requires the following npm packages: `express`, `body-parser` and `path`.

3. The `htmlRoutes.js` file include two routes:

   * A GET Route to `/survey` which displays the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page. 

4. The `apiRoutes.js` file contains two routes:

   * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This is used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

5. The application's data saves inside of `app/data/friends.js` as an array of objects. Each of these objects follow the format below:

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

6. The user's most compatible friend uses the following as a guide:

   * Each user's results are converted into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, the difference between current user's scores against those from other users are compared, question by question. The difference is then totaled. 
     * Example: 
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * The closest match will be the user with the least amount of difference.

7. Once the current user's has found the most compatible friend, the result displays as a modal pop-up.
   * The modal displays both the name and picture of the closest match.

