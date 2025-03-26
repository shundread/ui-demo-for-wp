# React demo

## Requirements

- Node version 20 or higher, might work with 18

## How to run

Clone the repository to a folder

```console
git clone URL_PROVIDED_BY_GIT_HOSTING_SITE SOME_FOLDER
cd SOME FOLDER
npm install
npm run dev
```

## Some extra info

Lingering TODOs on the code are steps that would be taken in a more serious project.

Dockerizing this application would have been in the plans too.

I adopted a minimal set of extra dependencies because those were not needed and eagerly adding dependencies on a project before you need them inevitably needs to a situation in the future where something big needs to be updated to a major new version, and each new dependency adds a chance that this update will be painful.

The CSS is a mess, I should probably have used some CSS library that allows nesting declarations and explicitly named more classes for things that needed to be styled rather than stack these fragile selectors like I have done. As-is the visual style would likely fall apart constantly during refactors.
