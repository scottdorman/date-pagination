# date-paginator
A minimal JavaScript library that extends Bootstrap's pagination component to provide a way of paging date-based results in your application.

## Requirements

- [Bootstrap v5 or later](http://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Dayjs v1.11.12 or later](https://day.js.org/)
- [Vanilla JS Datepicker](https://mymth.github.io/vanillajs-datepicker/) 

## Usage

A full list of dependencies required for the bootstrap-datepaginator to function correctly.
```html
<!-- Required Stylesheets -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="date-paginator.min.css">

<!-- Required Javascript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="date-paginator.min.js"></script>
<script>
    var d = new DatePaginator('#date-paginator');
    document.querySelector('#date-paginator').addEventListener('dateChanged.datePagination', e => {
        alert(e.detail.selectedDate);
    })
```

The component will bind to any existing DOM element.
```html
<nav id="paginator"></nav>
```

The most basic usage, in most cases this is all you'll need.
```js
var d = new DatePaginator('#date-paginator');
```

For advanced configuration, an options object can be passed on initialization.  
```js
var options = {
    endDate: { date: dayjs() },
    slideRange: { window: 7, style: 'weekly'},
}

var d = new DatePaginator('#date-paginator', options);
```

## Options
Configuration options that can be used to change behavior or visual elements.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `pageItem` | object || An object which provides the text and tooltip formatting for the page items. |
| `pageItem.text` | string | `'ddd<br/>D'` | Format used for page item text. For more information, see https://day.js.org/docs/en/display/format. |
| `pageItem.tooltip` | string | `'dddd, D MMMM YYYY'` | Format used for page item tooltips. For more information, see https://day.js.org/docs/en/display/format. |
| `slideRange` | object || An object which determines the number of days displayed to the left and right of the currently selected date. |
| `slideRange.window` | string, integer | `'weekly'` | Display the specified number of days to the left and right of the currently selected date. If `weekly`, the display will be limited to the days of the current week. |
| `size` | string | `undefined` | Sets the height of the paginator component. Accepts `small`, `normal`, `large`. |
| `highlightToday` | boolean | `true` | Whether or not to distinguish visually today's date. |
| `toolbar` | object || |
| `toolbar.showToolbar` | boolean | `true` | Display the toolbar. |
| `toolbar.showCalendar` | boolean | `true` | Display the calendar button to allow the user to choose a date using a date picker. |
| `toolbar.showToday` | boolean | `true` | Display the today button to allow the user to easily go back to today's date. |
| `startDate` | object || An object representing the earliest date that may be selected. Any dates shown before this date will be disabled. |
| `startDate.date` | string, DayJS | `dayjs(new Date(-8640000000000000))` | The earliest date that may be selected.
| `startDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `startDate`. |
| `endDate` | object || An object representing the latest date that may be selected. Any dates shown after this date will be disabled. |
| `endDate.date` | string, DayJS | `dayjs(new Date(8640000000000000))` | The latest date that may be selected. |
| `endDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `endDate`. |
| `selectedDate` | object || An object representing the selected date. |
| `selectedDate.date` | string, DayJS | `dayjs()` | The selected date. |
| `selectedDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `selectedDate`. |
| `selectedDate.text` | string | `'dddd<br/>D MMMM YYYY'` | Sets the date format used when displaying the `selectedDate`. |
| `selectedDate.highlightSelectedDate` | boolean | `true` | Whether or not to distinguish visually the selected date. |
| `classes` | object || |
| `classes.wrapperElement` | string | `undefined` | |
| `classes.pagination` | string | `undefined` | |
| `classes.pageItem` | string | `undefined` | |
| `classes.pageLink` | string | `undefined` | |
| `classes.pageLinkNav` | string | `undefined` | |
| `classes.icon` | string | `undefined` | |
| `classes.toolbar` | string | `bg-secondary-subtle` | |
| `classes.toolbarButtonGroup` | string | `undefined` | |
| `classes.toolbarButton` | string | `btn-link` | |
| `templates` | object || |
| `templates.pagination` | string | `<ul class="pagination date-pagination"></ul>` | |
| `templates.pageItem` | string | `<li class="page-item"></li>` | |
| `templates.pageLink` | string | `<a href="#" class="page-link text-center align-content-center"></a>` | |
| `templates.pageLinkNav` | string | `<button type="button" class="page-link text-center align-content-center"></button>` | |
| `templates.icon` | string | `<i class="bi"></i>` | |
| `templates.toolbar` | string | `<div class="btn-toolbar rounded rounded-top-0 justify-content-center" role="toolbar"></div>` | |
| `templates.toolbarButtonGroup` | string | `<div class="btn-group" role="group"></div>` | |
| `templates.toolbarButton` | string | `<button type="button" class="btn"></button>` | |
| `templates.disabledPageItem` | string | `<span class="d-inline-block" tabindex="0"></span>` | |
| `templates.datePicker` | string | `<input class="visually-hidden" id="datePicker"></input>` | |
| `text` | object || |
| `text.invalidDateFormat` | string | `The provided date is not in the correct format.` | |
| `text.outOfRange` | string | `Out of Range` | |
| `text.disabled` | string | `Disabled` | |
| `text.startOfRange` | string | `Start of range` | |
| `text.endOfRange` | string | `End of range` | |
| `icons` | object || |
| `icons.leftNav` | string | `bi-chevron-left` | |
| `icons.rightNav` | string | `bi-chevron-right` | |
| `icons.today` | string | `bi-calendar-date`| |
| `icons.datePicker` | string | `bi-calendar`| |

### offDays
An array which sets the days of the week to be considered off days, visually greyed out. Each array element is an object.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dates` | string array | `'Sat,Sun'` | Sets days of the week to be considered off days, visually greyed out. |
| `format` | string | `'ddd'` | Sets the date format used when parsing string representations of the date. |
| `disable` | boolean, object | `false` | Disable off days so they can not be selected. |

To disable off days and provide a custom message, set this to an object

```js
{
    tooltip: 'My custom message'
}
```

To define multiple off day sets e.g. regularly occurring days such as weekends alongside regular holidays such as Christmas.

```js
offDays: [{
	dates: [ 'Sat', 'Sun' ],
	format: 'ddd'
},
{
	dates: [ '2013-12-25' ],
	format: 'YYYY-MM-DD'
}]
```
To not dispaly any days as off days, set this to an empty array.

```js
offDays: []
```

### periodSeparators
An array which adds a visual reference to the start of a new calendar period (for example, as a week separator), illustrated by a thicker dividing line between dates.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dates` | string array | `'Mon'` | Sets days of the week to be considered a period start. |
| `format` | string | `'ddd'` | Sets the date format used when parsing string representations of the date. |

#### Basic usage

```js
periodSeparators: [{
	dates: [ 'Mon' ],
	format: 'ddd'
}]
```

To define multiple period separators, define multiple objects like so.

```js
periodSeparators: [{
	dates: [ 'Mon' ],
	format: 'ddd'
},
{
	dates: [ '1' ],
	format: 'D'
}]
```
To not display any period separators, set this to an empty array.

```js
periodSeparators: []
```

## Methods

### getSelectedDate
Gets the selected date as a DayJS instance from the paginator.

```js
var d = new DatePaginator('#date-paginator');
d.getSelectedDate()
```

### setSelectedDate
Sets the selected date, triggering a refresh to reflect the new state.
```js
var d = new DatePaginator('#date-paginator');
d.setSelectedDate({ date: '2013-10-05', format: 'YYYY-MM-DD' });
```

If called without passing a format argument, `selectedDate.format` will be used.

```js
var d = new DatePaginator('#date-paginator');
d.setSelectedDate({ date: '2013-10-05' });
```

You can also pass a callback function, which will be run after the date has been set, that receives the selected date as a parameter.

```js
var d = new DatePaginator('#date-paginator');
d.setSelectedDate({ date: '2013-10-05', format: 'YYYY-MM-DD' }, (data) => {
    console.log(data)
});
```
### remove
Removes the date paginator component. Removing attached events, internal attached objects, and added HTML elements.

```js
var d = new DatePaginator('#date-paginator');
d.destroy();
```

## Events

### dateChanged.datePagination
Fired when the selected date changes.

```js
var d = new DatePaginator('#date-paginator');
document.querySelector('#date-paginator').addEventListener('dateChanged.datePagination', e => {
    alert(e.detail.selectedDate);
})
```
