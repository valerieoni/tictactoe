<h1 align="center">TIC TAC TOE</h1>

[View the live project here.](https://valerieoni.github.io/tictactoe/)

This is a one page site which displays a simple tic tac toe game to be played between two players on a 3 X 3 or 5 X 5 board.

<h2 align="center"><img src="docs/screenshot.png"></h2>

## User Experience (UX)

-   ### User stories

    -   #### First Time Visitor Goals

        As a First Time Visitor, I want to:
        - I want to understand the site's main purpose and find out what features it provides
        - Easily navigate the pages
        - Play a simple tic tac toe game

    -   #### Returning Visitor Goals

        As a Returning Visitor, I want to:
        -  Play a simple web-based tic-tac-toe game
        -  Explore a different board size

    -   #### Frequent Visitor Goals

        As a frequent Visitor, I want to:
        -  Play tic tac toe with a friend or against a bot
        -  Play the game in turns
        -  have my marker symbol drawn when I click inside an empty square
        -  know when I have won, lost or drawn the game
        -  restart the game when one ends
        -  play a tic tac toe game on a 3X3 or 5X5 board.

-   ### Design

    -   #### Colour Scheme
        The main colors chosen are shades of green and blue.
        - Spring green was used for the title to make it stand out.
        - The blue colors used for the buttons are astranaut blue (#003D5B) and denim (#30638E).
        - The X's and O's text on the board are red and blue.

    -   #### Typography
        -   Arial is the font used for all text aside from the markers on the board. So that the text stands out and feel like one is actually marking a spot on the board the permanent marker font has been used for the X's and O's on the board.

*   ### Wireframes
    The wireframes for this project are:

    -   [PDF Wireframe document](docs/wireframes/tictactoe_wireframe.pdf)
    <h2 align="center">Desktop and tablet view</h2>
    <h2 align="center"><img src="docs/wireframes/desktop_and_tablet.png" alt="Desktop and tablet view" height="300px" />

    <img src="docs/wireframes/desktop_game_end.png" alt="Game end" height="300px"/>
    </h2>

    <h2 align="center">Mobile View</h2>
    <h2 align="center"><img src="docs/wireframes/mobile.png" alt="mobile view" height="400px" /></h2>
    

 ## Features

-   Responsive on all device sizes

-   Interactive elements

## Technologies Used

### Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
-   [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

### Frameworks, Libraries & Programs Used

1. [Git](https://git-scm.com/)
    - Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
2. [GitHub:](https://github.com/)
    - GitHub is used to store the projects code after being pushed from Git.
3. [Balsamiq:](https://balsamiq.com/)
    - Balsamiq was used to create the wireframes during the design process.
4. [Font Awesome:](https://fontawesome.com/)
    - Font Awesome was used on the buttons for asthetics reasons.
5. [Google Font](https://fonts.google.com/)
    - Permanent marker which is the font used for the markers on the board was imported from google font.


## Testing

The W3C Markup Validator and W3C CSS Validator Services were used to validate the project to ensure there were no syntax errors in the project.
Issues found while testing were fixed and the pages revalidated.

-   [W3C Markup Validator](https://jigsaw.w3.org/css-validator/#validate_by_input) - [Results](https://github.com/)
-   [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input) - [Results](https://github.com/)
    

### Testing User Stories from User Experience (UX) Section

-   #### First Time Visitor Goals

    1. As a First Time Visitor, I want to understand the site's main purpose and find out what features it provides.

    2. As a First Time Visitor, I want to easily navigate the pages

    3. As a First Time Visitor, I want to play a simple tic tac toe game


-   #### Returning Visitor Goals

    1. As a Returning Visitor, I want to play a simple web-based game.

    2. As a Returning Visitor, I want to other features of the site.
      

### Further Testing 

-   The Website was be tested on Google Chrome and Microsoft Edge
-   The website will be viewed on a variety of devices such as Desktop, Laptop, iPhone7, iPhone 8 & iPhoneX.
-   Lighthouse test was carried out for both desktop mobile devices in incognito mode and the result of the test shown below.
    #### Desktop device test
    <div align="center"><img src="docs/testing/lighthouse_test_desktop.png"></div>

     #### Mobile device test
    <div align="center"><img src="docs/testing/lighthouse_test_mobile.png"></div>

### Known Bugs
- [Issue raised](https://github.com/valerieoni/tictactoe/issues/1#issue-1104767504) - When I click restart button before a current game ends, the click event on the game mode buttons aren't triggered when clicked.
  I branched off master to fix this issue and created a pull request which was linked to the issue. The issue was closed upon merging the pull request into master branch.

### Future Enhancement
- Make the game play with bot more challenging - Currently the computer randomly picks a spot on the board to play. This can be improved upon by implenting the minimax algorithm. As the board can be either 3X3 or 5X5 and the alogirthm is a recursive algorithm I would need to look at the performance and how it can be optimised if need be.

## Deployment

### GitHub Pages

The project will be deployed to GitHub Pages using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/valerieoni/tictactoe)
2. In the GitHub repository, navigate to the Settings tab
3. Scroll down the Settings page until you locate the **Pages** Section.
5. Click on the **Pages** tab close to the bottom of the page
4. Under **Source**, click the dropdown called `none` and select `main` Branch.
5. Click "Save" button to save the changes and this will trigger the site deploymment automatically.
6. When you refresh the page, you will see that the site has been successfully published, along with a link to the published site.

### Forking the GitHub Repository

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/valerieoni/tictactoe)
2. From the top right menu buttons, locate and click the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/valerieoni/tictactoe)
2. Click the `Code` dropdown arrow button just above the list of files.
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

```
$ git clone https://github.com/valerieoni/tictactoe
```

7. Press Enter. Your local clone will be created.

```
$ git clone https://github.com/valerieoni/tictactoe
> Cloning into `CI-Clone`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

## Credits

### Code

-   [MDN Web Docs](https://developer.mozilla.org/) : For Pattern Validation code. Code was modified to better fit my needs and to match an Irish phone number layout to ensure correct validation. Tutorial Found [Here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel#Pattern_validation)


### Media

-   All images used were sourced from:


### Acknowledgements

-   My Mentor, Narender Singh for continuous support and great feedback.

-   Tutor support at Code Institute for their support.