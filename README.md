# QuoteWall
The quote wall is a project designed to share the story of Delta at Fontys ICT. It's a dynamic word cloud projected onto the wall of the Delta room. This interactive display aims to be engaging with active Delta students and passer bys while remaining easy to manage.

The quote wall can be accessed through a local Discord bot, operating within the official Delta Discord guild. Leveraging the existing management structure of this guild, we can utilize role delegation to grant necessary permissions for regular and administrative tasks.

Within the Delta Discord guild, four roles are known: administrator, member, alumni, and dropout. Administrative permissions will naturally be assigned to those holding the administrator roles. Interacting with the quote wall, posting new quotes and participating in voting, will be limited to active members only.

## Features and roadmap
The main features of the quote wall are the ability to post quotes, vote on them and manage them.

### Posting
New quotes can be posted by active Delta members who have the correct role in the Discord guild. Posting a quote is as simple as interacting with the Discord bot and writing down your quote. To appear on the display, a quote must attain a minimum number of community votes. This criterion is implemented to prevent disliked quotes from being showcased on the display.

### Management
The Discord bot facilitates the management of all quotes. Individuals have the ability to modify or delete their own quotes. Additionally, administrators possess the authority to edit or remove any quote, enabling effective moderation of the quote wall.

### Voting mechanism (future)
The quote wall is a community project, so it seems natural to allow for the community to decide which quotes are more important. Through voting, we allow users to mark which quotes they like the most, resulting in a bigger quote on the display. By using this community driven approach, it puts less pressure on the administrators to moderate the quote wall.

## Built with
- Discord bot — [TypeScript](https://www.typescriptlang.org), [Discord.js](https://discord.js.org)
- Frontend — [TypeScript](https://www.typescriptlang.org), [Svelte](https://svelte.dev)
- Data persistence — [SQLite](https://www.sqlite.org/index.html)

## Getting started
### Prerequisites
### Installation
Once you've pulled the project, install dependencies with `npm install`.

#### Developing
To start a development server, run either of the following commands:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

#### Building
To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Contributing
Contributions for the QuoteWall project will be exclusively handled via GitHub project boards and issues. Since the project operates as an open-source initiative, we encourage and appreciate all forms of contributions that align with the project's core objectives. For additional details, please refer to the [GitHub board]( https://github.com/users/Typiqally/projects/7/views/1).

### Meet our contributors
<a href = "https://github.com/Typiqally/quote-wall/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=Typiqally/quote-wall"/>
</a>

## License
QuoteWall is licensed under the terms of MIT. See [LICENSE](LICENSE) for details.
