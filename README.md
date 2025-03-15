<img width="1246" alt="blog-template" src="https://github.com/user-attachments/assets/98603992-139b-4e25-a6b5-6ab9af5523fb" />

# astro blog template

minimalistic but opinionated blog template using [astro](https://astro.build/) and [svelte](https://svelte.dev/). aims to be super easy to deploy and use, with a focus on performance and SEO, ease-of-use and design.

See a [live demo here](https://flo-bit.dev/blog-template/) (also doubles as a tutorial on how to use this template).

Features:

- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data (automatically generated)
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown support
- ✅ Pagination
- ✅ Syntax highlighting (+ copy button)
- ✅ Dark and light mode with toggle button or auto-detect
- ✅ Search included
- ✅ Tags for posts
- ✅ Super easy to deploy as a static site
- ✅ Includes some prebuilt components for you to use
- ✅ Easy to edit by editing the markdown directly

## tutorials

the demo blog doubles as a tutorial on how to use this template:

- [minimal setup with github pages](https://flo-bit.dev/blog-template/posts/how-to-use)

- [adding content](https://flo-bit.dev/blog-template/posts/adding-content)

- [supported markdown features](https://flo-bit.dev/blog-template/posts/markdown-style-guide)

## Minimal setup with github pages

1. Fork this repository by clicking on "Use template" (note: this repository per default uses github actions which are only free for public repositories).

2. In your repository settings, set up github pages to deploy using github actions (*SETTINGS* -> *PAGES* -> *SOURCE*: **Github Actions**)

3. Set up your blog info in `src/config.json` (most importantly change `SITE` to your deployment url, e.g. for github pages `https://<your-github-username>.github.io/` and `BASE` to your base path, e.g. for github pages `/<your-repo-name>`)

4. Your blog should be live in about 1 minute at `https://<your-github-username>.github.io/<your-repo-name>`

5. Add your blog posts in `src/content/blog/`

6. Add your info in `src/content/info/`:

- `description.md` is used for the homepage description
- `about.md` is used for the about page

## Notes

Search currently only works in production mode (i.e. when running `npm run build`) not in dev mode (`npm run dev`).

## Credits

Adopted from the default astro blog template when running `npm create astro@latest`.

## License

MIT.
