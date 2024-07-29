# date-pagination
A minimal JavaScript library that extends Bootstrap's pagination component to provide a way of paging date-based results in your application.

<img width="401" alt="date-pagination" src="https://github.com/user-attachments/assets/afd72b9a-28a0-4274-aef2-023c4026c9b9">

## Requirements

- [Bootstrap v5 or later](http://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Dayjs v1.11.12 or later](https://day.js.org/)
- [Vanilla JS Datepicker](https://mymth.github.io/vanillajs-datepicker/) 

## Usage

A full list of dependencies required for date-pagination to function correctly.
```js
<!-- Required Stylesheets -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker-bs5.min.css">
<link rel="stylesheet" href="date-pagination.min.css">

<!-- Required Javascript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/js/datepicker-full.js"></script>
<script src="date-pagination.min.js"></script>
<script>
    var d = new DatePagination('#date-pagination');
    document.querySelector('#date-pagination').addEventListener('dateChanged.datePagination', e => {
        alert(e.detail.selectedDate);
    })
```

The component will bind to any existing DOM element.
```html
<nav id="date-pagination"></nav>
```

The most basic usage, in most cases this is all you'll need.
```js
var d = new DatePagination('#date-pagination');
```

For advanced configuration, an options object can be passed on initialization.  
```js
var options = {
    endDate: { date: dayjs() },
    slideRange: { window: 'weekly'},
}

var d = new DatePagination('#date-pagination', options);
```

You can also pass options for the date picker instance. For more information, see https://mymth.github.io/vanillajs-datepicker/#/options.
```js
var options = {
    endDate: { date: dayjs() },
    slideRange: { window: 'weekly'},
}

var datePickerOptions = {
    clearButton: true
}

var d = new DatePagination('#date-pagination', options, datePickerOptions);
```

## Options
Configuration options that can be used to change behavior or visual elements.

### pageItem
An object which provides the text and tooltip formatting for the page items.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `pageItem.text` | string | `'ddd<br/>D'` | Format used for page item text. For more information, see https://day.js.org/docs/en/display/format. |
| `pageItem.tooltip` | string | `'dddd, D MMMM YYYY'` | Format used for page item tooltips. For more information, see https://day.js.org/docs/en/display/format. |

### slideRange
An object which determines the number of days displayed to the left and right of the currently selected date.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `slideRange.window` | string, integer | `'weekly'` | Display the specified number of days to the left and right of the currently selected date. If `weekly`, the display will be limited to the days of the current week. |

### size
Sets the height of the pagination component.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | string | `undefined` | Sets the height of the pagination component. Accepts `small`, `normal`, `large`. |

### highlightToday
Whether or not to distinguish visually today's date.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `highlightToday` | boolean | `true` | Whether or not to distinguish visually today's date. |

### toolbar
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `toolbar.showToolbar` | boolean | `true` | Display the toolbar. |
| `toolbar.showCalendar` | boolean | `true` | Display the calendar button to allow the user to choose a date using a date picker. |
| `toolbar.showToday` | boolean | `true` | Display the today button to allow the user to easily go back to today's date. |

### startDate
An object representing the earliest date that may be selected. Any dates shown before this date will be disabled.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `startDate.date` | string, DayJS | `dayjs(new Date(-8640000000000000))` | The earliest date that may be selected.
| `startDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `startDate`. |

### endDate
An object representing the latest date that may be selected. Any dates shown after this date will be disabled.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `endDate.date` | string, DayJS | `dayjs(new Date(8640000000000000))` | The latest date that may be selected. |
| `endDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `endDate`. |

### selectedDate
An object representing the selected date.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `selectedDate.date` | string, DayJS | `dayjs()` | The selected date. |
| `selectedDate.format` | string | `'YYYY-MM-DD'` | Sets the date format used when parsing string representations of `selectedDate`. |
| `selectedDate.text` | string | `'dddd<br/>D MMMM YYYY'` | Sets the date format used when displaying the `selectedDate`. |
| `selectedDate.highlightSelectedDate` | boolean | `true` | Whether or not to distinguish visually the selected date. |

### classes
Additional CSS classes for the corresponding HTML element template.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `classes.wrapperElement` | string | `undefined` | |
| `classes.pagination` | string | `undefined` | |
| `classes.pageItem` | string | `undefined` | |
| `classes.pageLink` | string | `undefined` | |
| `classes.pageLinkNav` | string | `undefined` | |
| `classes.icon` | string | `undefined` | |
| `classes.toolbar` | string | `bg-secondary-subtle` | |
| `classes.toolbarButtonGroup` | string | `undefined` | |
| `classes.toolbarButton` | string | `btn-link` | |

### templates
The HTML element template used to to define the pagination structure.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `templates.pagination` | string | `<ul class="pagination date-pagination"></ul>` | The Bootstrap `pagination` component. |
| `templates.pageItem` | string | `<li class="page-item"></li>` | The individual `page-item` elements. |
| `templates.pageLink` | string | `<a href="#" class="page-link text-center align-content-center"></a>` | The `page-link` anchor. |
| `templates.pageLinkNav` | string | `<button type="button" class="page-link text-center align-content-center"></button>` | The `page-link` anchor used for forward or backward navigation. |
| `templates.icon` | string | `<i class="bi"></i>` | THe Bootstrap Icon container. |
| `templates.toolbar` | string | `<div class="btn-toolbar rounded rounded-top-0 justify-content-center" role="toolbar"></div>` | The Bootstrap button toolbar component. |
| `templates.toolbarButtonGroup` | string | `<div class="btn-group" role="group"></div>` | The individual button group elements. |
| `templates.toolbarButton` | string | `<button type="button" class="btn"></button>` | The toolbar button. |
| `templates.disabledPageItem` | string | `<span class="d-inline-block" tabindex="0"></span>` | A disabled `page-item` element. This allows disabled elements to still display tooltips. |
| `templates.datePicker` | string | `<input class="visually-hidden" id="datePicker"></input>` | The `input` associated with the datePicker control. |

### text
Text string content displayed by the pagination control. This can be modified for localization.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text.invalidDateFormat` | string | `The provided date is not in the correct format.` | |
| `text.outOfRange` | string | `Out of Range` | |
| `text.disabled` | string | `Disabled` | |
| `text.startOfRange` | string | `Start of range` | |
| `text.endOfRange` | string | `End of range` | |

### icons
The Bootstrap Icon classes used for icons.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
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
Gets the selected date as a DayJS instance from the pagination component.

```js
var d = new DatePagination('#date-pagination');
d.getSelectedDate()
```

### setSelectedDate
Sets the selected date, triggering a refresh to reflect the new state.
```js
var d = new DatePagination('#date-pagination');
d.setSelectedDate({ date: '2013-10-05', format: 'YYYY-MM-DD' });
```

If called without passing a format argument, `selectedDate.format` will be used.

```js
var d = new DatePagination('#date-pagination');
d.setSelectedDate({ date: '2013-10-05' });
```

You can also pass a callback function, which will be run after the date has been set, that receives the selected date as a parameter.

```js
var d = new DatePagination('#date-pagination');
d.setSelectedDate({ date: '2013-10-05', format: 'YYYY-MM-DD' }, (data) => {
    console.log(data)
});
```
### remove
Removes the date pagination component. Removing attached events, internal attached objects, and added HTML elements.

```js
var d = new DatePagination('#date-pagination');
d.destroy();
```

## Events

### dateChanged.datePagination
Fired when the selected date changes.

```js
var d = new DatePagination('#date-pagination');
document.querySelector('#date-pagination').addEventListener('dateChanged.datePagination', e => {
    alert(e.detail.selectedDate);
})
```
