---
title:            Creating Structure with HTML and CSS
lecture_date:     2017-02-15 00:00:00 -0500
section:          Lab
---

### Grids

When working on larger projects it's important to define a grid system when you first start to build the
website. This allows you to quickly and consistently position elements in your layout.

The 12 column grid is a common way to structure an HTML page. Software like Sketch and Adobe InDesign have
a 12 column grid available by default. Designing on a grid means that you can take your designs and quickly
translate them into code, since the grid in your design software will match the grid you create in your HTML and CSS.

### 12 Column Fluid Grid with Floats

<div class="grid-example">
  <div class="grid-example-container-fluid">
    <div class="grid-example-row">
      <div class="grid-example-col grid-example-col-1">1</div>
      <div class="grid-example-col grid-example-col-1">1</div>
      <div class="grid-example-col grid-example-col-2">2</div>
      <div class="grid-example-col grid-example-col-2">2</div>
      <div class="grid-example-col grid-example-col-6">6</div>
    </div>
    <div class="grid-example-row">
      <div class="grid-example-col grid-example-col-6">6</div>
      <div class="grid-example-col grid-example-col-6">6</div>
    </div>
    <div class="grid-example-row">
      <div class="grid-example-col grid-example-col-12">12</div>
    </div>
  </div>
</div>
<br>

In this example grid the CSS `float` property is used to align columns next to each other. Each series of columns
is contained inside a `row` class, which is in turn contained inside a `container-fluid` class.
This is necessary to `clear` the floated elements, using a [clearfix hack](http://stackoverflow.com/questions/8554043/what-is-a-clearfix).

```css
.container:after,
.row:after {
  content: '';
  display: table;
  clear: both;
}
```

Inside each row is a series of columns, which are created using a shared `col` class, and a `col-#{NUMBER}` where `NUMBER` is
the number of grid units that make up this column. `col-12` creates a column that spans the full width of
the parent container, while `col-6` only spans 50% of the width.

```css
.col {
  float: left;
}

.col-1  { width: 8.33%; }
.col-2  { width: 16.66%; }
.col-3  { width: 25%; }
.col-4  { width: 33.33%; }
.col-5  { width: 41.66%; }
.col-6  { width: 50%; }
.col-7  { width: 58.33%; }
.col-8  { width: 66.66%; }
.col-9  { width: 75%; }
.col-10 { width: 83.33%; }
.col-11 { width: 91.66%; }
.col-12 { width: 100%; }
```

To determine the widths of your grid units divide 100% by the number of columns in your grid:

```
100% / columns = grid unit size

100% / 12 = 8.33...
```

Then, for each of the column sizes in your grid, multiply the grid unit by the number of columns:

```
col-1 = 8.33 * 1 = 8.33%
col-2 = 8.33 * 2 = 16.66%
col-3 = 8.33 * 3 = 25%
```

Now, column sizes can be mixed and matched inside of rows to create layouts for a particular design.

If you wanted to limit the maximum width of your grid layout, you can wrap all of your rows with a
`container` class.

```html
<div class="container">
  <div class="row">
    <div class="col-6">6</div>
    <div class="col-6">6</div>
  </div>
  <div class="row">
    <div class="col-12">12</div>
  </div>
</div>
```

```css
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
```

---

### Basic Page Structure

HTML5 adds a number of [semantic tags](http://www.w3schools.com/html/html5_semantic_elements.asp)
that can be used to add meaning to your page structure. We'll be focusing on the following tags,
which can be used to mark up many page layouts.

| --- |---|
| `<header>` | Defines a header for a document or a section |
| `<nav>` | Defines a container for navigation links |
| `<section>` | Defines a section in a document |
| `<aside>` | Defines content aside from the content (like a sidebar) |
| `<footer>` | Defines a footer for a document or a section |

---

### Resources

- [HTML Layout Elements](http://www.w3schools.com/html/html_layout.asp)
- [All About Floats](https://css-tricks.com/all-about-floats/)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Bootstrap](http://getbootstrap.com/)
