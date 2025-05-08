<a name="readme-top" />
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joshbacon/codegambit">
    <img src="public/logo192.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center" style="color:#008000;">>code_gambit</h3>

  <p align="center">
    learn the basics of coding by playing chess!
    <br />
    <br />
    <a href="http://codegambit.joshbacon.ca/">View Site</a>
    ·
    <a href="https://github.com/joshbacon/codegambit/issues/new">Report Bug</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project

[![codegambit Screen Shot]][product-screenshot]

`codegambit` is web app aimed to get users used to entering commands and scripting in the context of playing chess. Play a game against a bot or complete puzzles by writing scripts that execute multiple moves to solve the problem.



### Built With

This project is built with primarily TypeScript at the moment. I used React for the frontend design and functionality along with Redux to maintain the game state. 

* [![React][React.js]][React-url]
* [![Redux][Redux.com]][Redux-url]

### Coming Up

The user management system was implemented with the help of PocketBase. This will allow for game/puzzle tracking and opens the door for multiplayer games. I aim to create a Go backend to maintain multiplayer game lobbies using websockets. For faster load times, and other benefits of server side rendering, I also want to migrate to Next.JS.

* [![PocketBase][PocketBase]][PocketBase-url]
* [![go][go]][go-url]
* [![Next.js][Next.js]][Next-url]


<!-- ROADMAP -->
## Roadmap

- [x] Finalize base-application
- [ ] Add puzzles/lessons
- [ ] Add backend
- [ ] Add multiplayer & accounts
- [ ] Migrate to Next.js

See the [open issues](https://github.com/joshbacon/codegambit/issues) for a full list of proposed features (and known issues).



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information. -->


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: ./public/example.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.com]: https://img.shields.io/badge/Redux-764abc?style=for-the-badge&logo=redux&logoColor=FFF
[Redux-url]: https://redux.js.org/
[Node.js]: https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=Node.js
[Node-url]: https://nodejs.org/en/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[PocketBase]: https://img.shields.io/badge/PocketBase-white?style=for-the-badge&logo=PocketBase&logoColor=black
[PocketBase-url]: https://clerk.com/
[go]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=Go&logoColor=white
[go-url]: https://golang.google.cn/