# Blank

The **blank** page is an emoty page who only required the configuration of a `title` and a `content`

## Champs de blank

```yaml
blank: 
    <blank_template>
```

**<blank_template>**

The `<blank_template>` section contains the configuration required for the creation of the page.

```yaml
# The name of the page, equivalent to <title> in HTML, must be text only.
title: <string> | default = "Title"

# Content and content_file are two way to define the content of the page, it can be use to insert HTML code in the page.
# content and content_file are mutually exclusive.
content: <string>
content_file: <filename>
```

## Exemple de configuration pour `blank`
```yaml
pages:
  - title: Home
    path: /
    template:
      blank:
        title: Welcome to our site
        content: |
          <h1>Hey, i'm Bastien, some wonderful guy</h1>
          <h2>and welcome to my a-ma-zing website!!</h2>
```