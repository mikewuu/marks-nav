# Marks Navigation for Inkdrop

A plugin that lets you add marks to help navigate long notes. Marks are intended for jumping in-and-out of areas of interest. They're less formal than headings, and intended to be used between paragraphs, or even sentences.

## Install

```
ipm install marks
```

## Usage

Bold some text and append an *emphasized* colon. ie. `** About marks*:* **` 

##### Example:

> Let's see how we can add marks in the middle of a paragraph. ** About marks*:* ** Every mark has a title, and won't be rendered when viewed in Inkdrop. The title will shown in the marks menu.

The abstract syntax allows for graceful fallback: if your note is ever rendered in another markdown renderer seeing a mark shouldn't be too out of place for the reader.

To bring up the marks in your note, use the `marks:show` command. Then click on a mark to navigate to its location.

### Shortcuts

| Action | Mac | Windows | Linux |
| ------- | ------- | ------- | ------- |
| Show Marks Menu | `cmd + m`  | `ctrl + m` | `ctrl + m` |


## Roadmap

Possible features to be implemented in no particular order:

- Shortcut to jump to a specific mark (ie. `ctrl + m + 3 + <CR>` to go to the 3rd mark)
- Shortcut to jump back to previous location
- Snippet to insert mark
