/* =========================================================
 * date-pagination.js v1.0.0
 * =========================================================
 * Copyright 2024 Scott Dorman
 * Project URL : https://github.com/scottdorman/date-paginator
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

class DatePagination {
	static #eventKeys = {
		selectedDateChangedEvent: "dateChanged.datePagination"
	};

	static #weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	static #defaultFormats = {
		date: 'YYYY-MM-DD',
		day: 'ddd'
	};

	static #defaultOptions = {
		pageItem: {
			text: 'ddd<br/>D',
			tooltip: 'dddd, D MMMM YYYY',
		},

		slideRange: {
			window: 'weekly'
		},

		size: undefined,
		highlightToday: true,

		toolbar: {
			showToolbar: true,
			showCalendar: true,
			showToday: true,
		},

		startDate: {
			date: dayjs(new Date(-8640000000000000)),
			format: DatePagination.#defaultFormats.date
		},

		endDate: {
			date: dayjs(new Date(8640000000000000)),
			format: DatePagination.#defaultFormats.date
		},

		selectedDate: {
			date: dayjs().startOf('d'),
			format: DatePagination.#defaultFormats.date,
			text: 'dddd<br/>D MMMM YYYY',
			highlight: true
		},

		offDays: [
			{
				dates: ['Sat', 'Sun'],
				format: DatePagination.#defaultFormats.day,
				disable: false
			}
		],

		periodSeparators: [
			{
				dates: ['Mon'],
				format: DatePagination.#defaultFormats.day
			}
		],

		classes: {
			wrapperElement: undefined,
			pagination: undefined,
			pageItem: undefined,
			pageLink: undefined,
			pageLinkNav: undefined,
			icon: undefined,
			toolbar: 'bg-secondary-subtle',
			toolbarButtonGroup: undefined,
			toolbarButton: 'btn-link'
		},

		templates: {
			pagination: '<ul class="pagination date-pagination"></ul>',
			pageItem: '<li class="page-item"></li>',
			pageLink: '<a href="#" class="page-link text-center align-content-center"></a>',
			pageLinkNav: '<button type="button" class="page-link text-center align-content-center"></button>',
			icon: '<i class="bi"></i>',
			toolbar: '<div class="btn-toolbar rounded rounded-top-0 justify-content-center" role="toolbar"></div>',
			toolbarButtonGroup: '<div class="btn-group" role="group"></div>',
			toolbarButton: '<button type="button" class="btn"></button>',
			disabledPageItem: '<span class="d-inline-block" tabindex="0"></span>',
			datePicker: '<input class="visually-hidden" id="datePicker"></input>'
		},

		text: {
			invalidDateFormat: 'The provided date is not in the correct format.',
			outOfRange: 'Out of Range',
			disabled: 'Disabled',
			startOfRange: 'Start of range',
			endOfRange: 'End of range',
			todayButtonTooltip: 'Go to Today',
			calendarButtonTooltip: 'Select a date'
		},

		icons: {
			leftNav: 'bi-chevron-left',
			rightNav: 'bi-chevron-right',
			today: 'bi-calendar-date',
			datePicker: 'bi-calendar'
		}
	};

	#element;
	#options;
	#datePickerOptions;
	#initialized = false;
	#contentDOM = {
		wrapper: null,
		leftNav: null,
		rightNav: null,
		icon: null,
		listItem: null,
		calendar: null,
		toolbar: null,
		datePicker: null,
		datePickerInput: null
	}

	constructor(element, options, datePickerOptions) {
		this.#element = document.querySelector(element);
		this.#options = {
			...DatePagination.#defaultOptions,
			...options
		};

		this.#normalizeOptions();

		var daysOfWeekHighlighted = [];
		var daysOfWeekDisabled = [];

		if (this.#options.offDays) {
			for (const offDays of this.#options.offDays) {
				for (const date of offDays.dates) {
					var index = DatePagination.#weekDays.indexOf(date);
					if (index !== -1) {
						daysOfWeekHighlighted.push(index);
						if (offDays.disable) {
							daysOfWeekDisabled.push(index);
						}
					}
				}
			}
		}

		var defaultDatePickerOptions = {
			autohide: true,
			buttonClass: 'btn',
			todayButton: this.#options.toolbar.showToday,
			todayHighlight: this.#options.highlightToday,
			daysOfWeekHighlighted: daysOfWeekHighlighted,
			daysOfWeekDisabled: daysOfWeekDisabled,
			minDate: this.#options.startDate.date.toDate(),
			maxDate: this.#options.endDate.date.toDate()
		};

		this.#datePickerOptions = {
			...defaultDatePickerOptions,
			...datePickerOptions
		};

		this.#render();
		this.#subscribeEvents();
	}

	getSelectedDate() {
		return this.#options.selectedDate.date.clone();
	}

	setSelectedDate(options, cb) {
		var d = dayjs(options.date, options.format ? options.format : this.#options.selectedDate.format);
		this.#setSelectedDate(d);
		this.#render();

		if (cb && (typeof cb === 'function')) {
			cb(this.#options.selectedDate.date);
		}
	}

	#subscribeEvents() {
		[...this.#element.querySelectorAll('[data-pagination-action]')].map(triggerEl => {
			triggerEl.addEventListener('click', event => {
				this.#handleEvents(event);
			});
		});
	}

	#unsubscribeEvents() {
		this.#element.removeEventListener(DatePagination.#eventKeys.selectedDateChangedEvent);
	}

	#removeDatePicker() {
		if (this.#contentDOM.datePicker) {
			this.#contentDOM.datePicker.destroy();
		}
	}

	destroy() {
		if (this.#initialized) {
			this.#removeDatePicker();
			this.#contentDOM.wrapper.remove();
			this.#contentDOM.wrapper = null;
			this._unsubscribeEvents();
		}

		this.initialized = false;
	}

	#setSelectedDate(selectedDate) {
		if ((!selectedDate.isSame(this.#options.selectedDate.date, 'd')) &&
			(!selectedDate.isBefore(this.#options.startDate.date, 'd')) &&
			(!selectedDate.isAfter(this.#options.endDate.date, 'd'))) {

			this.#options.selectedDate.date = selectedDate.startOf('day');
			this.#contentDOM.datePicker.setDate(this.#options.selectedDate.date.toDate());
			this.#element.dispatchEvent(new CustomEvent(DatePagination.#eventKeys.selectedDateChangedEvent, {
				detail: {
					selectedDate: selectedDate.clone()
				}
			}));
		}
	}

	#handleEvents(event) {
		event.preventDefault();
		var targetDataset = event.target.dataset;
		if (event.target.tagName === 'I') {
			targetDataset = event.target.parentElement.dataset;
		}

		switch (targetDataset.paginationAction) {
			case 'goto':
				this.#contentDOM.datePicker.show();
				break;

			case 'today':
				this.#setSelectedDate(dayjs());
				this.#render();
				break;

			case 'item':
				this.#setSelectedDate(dayjs(event.target.dataset.moment));
				this.#render();
				break;

			case 'left':
				var next = this.#next(this.#options.selectedDate.date, this.#previousDay);
				if (next) {
					this.#setSelectedDate(next);
					this.#render();
				}
				break;

			case 'right':
				var next = this.#next(this.#options.selectedDate.date, this.#nextDay);
				if (next) {
					this.#setSelectedDate(next);
					this.#render();
				}
				break;
		}
	}

	#normalizeOptions() {
		// Parse and nomalize size options
		if (this.#options.size === 'small') {
			this.#options.size = 'sm';
		}
		else if (this.#options.size === 'large') {
			this.#options.size = 'lg';
		}

		// Parse start and end dates 
		this.#shimDateObject('startDate');
		this.#shimDateObject('endDate');

		// Parse, set and validate the initially selected date 
		// 1. overridding the default value of today 
		this.#shimDateObject('selectedDate');
		// 2. enforce selectedDate is within start and end date range
		if (this.#options.selectedDate.date.isBefore(this.#options.startDate.date)) {
			this.#options.selectedDate.date = this.#options.startDate.date.clone();
		}

		if (this.#options.selectedDate.date.isAfter(this.#options.endDate.date)) {
			this.#options.selectedDate.date = this.#options.endDate.date.clone();
		}
	}

	#shimDateObject(option) {
		if (typeof this.#options[option].date === 'string') {
			var format = this.#options[option].format ?? DatePagination.#defaultFormats.date;
			this.#options[option].date = dayjs(this.#options[option].date, format).startOf('day');
		}
		else if (!this.#options[option].date instanceof dayjs) {
			this.#options[option].date = null;
			throw new Error(this.#options.text.invalidDateFormat);
		}
	}

	#previousDay(m) {
		return m.subtract(1, 'day');
	}

	#nextDay(m) {
		return m.add(1, 'day');
	}

	#next(m, fn) {
		var tmp = m,
			next,
			offDay,
			inRange = true;

		do {
			// get next date
			tmp = fn(tmp);
			offDay = this.#isOffDay(tmp);
			inRange = this.#inRange(tmp);
			// check date valid and in range
			if ((!offDay || !offDay.disable) && inRange) {
				next = tmp;
				break;
			}
		}
		while (inRange);

		return next;
	}

	#inRange(m) {
		return (m.isSame(this.#options.startDate.date) || m.isAfter(this.#options.startDate.date)) &&
			(m.isSame(this.#options.endDate.date) || m.isBefore(this.#options.endDate.date));
	}

	#isSelectedDate(m) {
		return m.isSame(this.#options.selectedDate.date);
	}

	#isToday(m) {
		return m.isSame(dayjs().startOf('day'));
	}

	#isSeparator(m) {
		var result = false;
		for (const separators of this.#options.periodSeparators) {
			if (separators.dates.indexOf(m.format(separators.format)) !== -1) {
				result = separators;
				break;
			}
		}

		return result;
	}

	// If an off day then we also need it's options i.e. selectable,
	// so we'll return the offDays object itself
	#isOffDay(m) {
		var result = false;
		for (const offDays of this.#options.offDays) {
			if (offDays.dates.indexOf(m.format(offDays.format)) !== -1) {
				result = offDays;
				break;
			}
		}

		return result;
	}

	#formatText(m, isSelected) {
		return isSelected ? m.format(this.#options.selectedDate.text) : m.format(this.#options.pageItem.text);
	}

	#formatTooltip(m, inRange, isOffDay) {
		var tooltip = m.format(this.#options.pageItem.tooltip);
		if (!inRange) {
			tooltip = this.#options.text.outOfRange;
		}
		else if (isOffDay && isOffDay.disable) {
			tooltip = isOffDay.disable.tooltip ? isOffDay.disable.tooltip : tooltip;
		}

		return tooltip;
	}

	#getDaysBetweenExtended(start, end, config) {
		const range = [];
		let current = start;
		while (!current.isAfter(end)) {
			var isSelected = this.#isSelectedDate(current);
			var inRange = this.#inRange(current);
			var isOffDay = this.#isOffDay(current);

			range.push({
				m: current.format(config.format),
				inRange: inRange,
				isSelected: isSelected,
				isToday: this.#isToday(current),
				isOffDay: isOffDay,
				isSeparator: this.#isSeparator(current),
				text: this.#formatText(current, isSelected),
				tooltip: this.#formatTooltip(current, inRange, isOffDay)
			});

			current = current.add(1, 'days');
		}

		return range;
	}

	#buildData() {
		var range = {};
		if (typeof this.#options.slideRange.window === 'string') {
			if (this.#options.slideRange.window === 'weekly') {
				var selectedDate = this.#options.selectedDate.date.get('d');
				var start = selectedDate - this.#options.selectedDate.date.startOf('w').get('d');
				var end = this.#options.selectedDate.date.endOf('w').get('d') - selectedDate;

				range.start = this.#options.selectedDate.date.subtract(start, 'd');
				range.end = this.#options.selectedDate.date.add(end, 'd');
			}
		}
		else if (typeof this.#options.slideRange.window === 'number') {
			var window = this.#options.slideRange.window ?? 7;
			range.start = this.#options.selectedDate.date.subtract(window, 'd');
			range.end = this.#options.selectedDate.date.add(window, 'd');
		}

		var data = {
			startOfRange: this.#next(this.#options.selectedDate.date, this.#previousDay) ? false : true,
			endOfRange: this.#next(this.#options.selectedDate.date, this.#nextDay) ? false : true,
			items: this.#getDaysBetweenExtended(range.start, range.end, { format: this.#options.selectedDate.format })
		};

		return data;
	}

	#createElementFromTemplate(templateName, trim = true) {
		var templateContent = this.#options.templates[templateName];

		templateContent = trim ? templateContent.trim() : templateContent;
		if (!templateContent) {
			return null;
		}

		const template = document.createElement('template');
		template.innerHTML = templateContent;
		const contentResult = template.content.children;

		// Return either an HTMLElement or HTMLCollection,
		// based on whether the input HTML had one or more roots.
		var result = (contentResult.length === 1) ? contentResult[0] : contentResult;

		var additionalClasses = this.#options.classes[templateName];
		if (additionalClasses) {
			result.classList.add(additionalClasses);
		}

		return result;
	}

	#appendListItem(child, dataset = null) {
		var pageItem = this.#createElementFromTemplate('pageItem');
		pageItem.append(child);
		if (dataset) {
			for (var prop in dataset) {
				if (dataset.hasOwnProperty(prop)) {
					pageItem.setAttribute(prop, dataset[prop])
				}
			}
		}

		return pageItem;
	}

	#setNavAttributes(element, direction) {
		element.setAttribute('data-pagination-action', direction);
		element.setAttribute('data-pagination-item-type', 'nav');
	}

	#setComputedSizeClass(prefix, element) {
		if (this.#options.size) {
			if (this.#options.size === 'sm') {
				element.classList.add(`${prefix}-sm`);
			}
			else if (this.#options.size === 'lg') {
				element.classList.add(`${prefix}-lg`);
			}
		}
	}

	#render() {
		var data = this.#buildData();

		if (!this.#initialized) {
			if (this.#options.classes.wrapperElement) {
				this.#element.classList.add(this.#options.classes.wrapperElement);
			}

			this.#contentDOM.wrapper = this.#createElementFromTemplate('pagination');
			this.#setComputedSizeClass('pagination', this.#contentDOM.wrapper);
			this.#contentDOM.wrapper.setAttribute('data-pagination-start-date', this.#options.startDate.date);
			this.#contentDOM.wrapper.setAttribute('data-pagination-end-date', this.#options.endDate.date);

			if (this.#options.toolbar.showToolbar) {
				this.#element.classList.add('d-inline-block');

				var toolbar = this.#createElementFromTemplate('toolbar');
				this.#contentDOM.wrapper.classList.add('mb-0');

				if (this.#options.toolbar.showToday) {
					var buttonIcon = this.#createElementFromTemplate('icon');
					buttonIcon.classList.add(this.#options.icons.today);

					var button = this.#createElementFromTemplate('toolbarButton');
					button.setAttribute('data-pagination-action', 'today');
					button.setAttribute('title', this.#options.text.todayButtonTooltip);
					button.append(buttonIcon);

					var buttonGroup = this.#createElementFromTemplate('toolbarButtonGroup');
					this.#setComputedSizeClass('btn-group', buttonGroup);

					buttonGroup.append(button);

					if (this.#options.toolbar.showCalendar) {
						buttonGroup.classList.add('me-2')
					}

					toolbar.append(buttonGroup);
				}

				if (this.#options.toolbar.showCalendar) {
					var buttonIcon = this.#createElementFromTemplate('icon');
					buttonIcon.classList.add(this.#options.icons.datePicker);

					var button = this.#createElementFromTemplate('toolbarButton');
					button.setAttribute('data-pagination-action', 'goto');
					button.setAttribute('title', this.#options.text.calendarButtonTooltip);
					button.setAttribute('id', 'datePickerContainer');
					button.append(buttonIcon);

					var buttonGroup = this.#createElementFromTemplate('toolbarButtonGroup');
					this.#setComputedSizeClass('btn-group', buttonGroup);
					buttonGroup.append(button);

					toolbar.append(buttonGroup);

					this.#contentDOM.datePickerInput = this.#createElementFromTemplate('datePicker');
					toolbar.append(this.#contentDOM.datePickerInput);	
				}

				this.#contentDOM.toolbar = toolbar;
			}

			this.#contentDOM.leftNav = this.#createElementFromTemplate('pageLink');
			this.#setNavAttributes(this.#contentDOM.leftNav, 'left');

			this.#contentDOM.rightNav = this.#createElementFromTemplate('pageLink');
			this.#setNavAttributes(this.#contentDOM.rightNav, 'right');

			if (this.#options.toolbar.showToolbar) {
				this.#contentDOM.leftNav.classList.add('rounded-bottom-0');
				this.#contentDOM.rightNav.classList.add('rounded-bottom-0');
			}

			var leftNavIcon = this.#createElementFromTemplate('icon');
			leftNavIcon.classList.add(this.#options.icons.leftNav);
			this.#contentDOM.leftNav.append(leftNavIcon);

			var rightNavIcon = this.#createElementFromTemplate('icon');
			rightNavIcon.classList.add(this.#options.icons.rightNav);
			this.#contentDOM.rightNav.append(rightNavIcon);

			this.#initialized = true;
		}
		else {
			this.#removeDatePicker();
		}

		while (this.#element.lastChild) {
			this.#element.removeChild(this.#element.lastChild);
		}

		while (this.#contentDOM.wrapper.lastChild) {
			this.#contentDOM.wrapper.removeChild(this.#contentDOM.wrapper.lastChild);
		}

		this.#element.append(this.#contentDOM.wrapper);
		if (this.#options.toolbar.showToolbar && this.#contentDOM.toolbar) {
			if (this.#options.toolbar.showCalendar) {
				this.#contentDOM.datePicker = new Datepicker(this.#contentDOM.datePickerInput, this.#datePickerOptions);
				this.#contentDOM.datePickerInput.addEventListener('changeDate', event => {
					this.#setSelectedDate(dayjs(event.detail.date));
					this.#render();
				});
			}
			this.#element.append(this.#contentDOM.toolbar);
		}

		var data = this.#buildData();

		this.#contentDOM.leftNav.classList.remove('disabled');
		this.#contentDOM.leftNav.setAttribute('title', '');
		this.#contentDOM.rightNav.removeAttribute('disabled');

		if (data.startOfRange) {
			this.#contentDOM.leftNav.classList.add('disabled');
			this.#contentDOM.leftNav.setAttribute('disabled', 'disabled');
			this.#contentDOM.leftNav.setAttribute('title', this.#options.text.startOfRange);
		}

		this.#contentDOM.wrapper.append(this.#appendListItem(this.#contentDOM.leftNav, { 'data-pagination-item-type': 'nav' }));

		[...data.items].map((item) => {
			var dateItem = this.#createElementFromTemplate('pageLink');
			dateItem.setAttribute('data-moment', item.m);
			dateItem.setAttribute('data-pagination-action', 'item');
			dateItem.setAttribute('title', item.tooltip);

			if (item.isSelected && this.#options.selectedDate.highlight) {
				dateItem.classList.add('active');
			}

			if (item.isToday && this.#options.highlightToday) {
				dateItem.classList.add('today', 'text-nowrap');
			}

			if (item.isSeparator) {
				dateItem.classList.add('separator');
			}

			if (!item.inRange) {
				dateItem.classList.add('disabled');
			}

			dateItem.innerHTML = item.text;
			var dateItemElement = this.#appendListItem(dateItem);

			if (item.isOffDay) {
				dateItem.classList.add('offday');
				if (item.isOffDay.disable) {
					var disabled = this.#createElementFromTemplate('disabledPageItem');
					disabled.setAttribute('title', item.tooltip);
					dateItem.classList.add('disabled');
					disabled.append(dateItem);
					dateItemElement = this.#appendListItem(disabled);
				}
			}
			else {
				dateItemElement.addEventListener('click', event => {
					this.#handleEvents(event);
				});
			}

			this.#contentDOM.wrapper.append(dateItemElement);
		})

		this.#contentDOM.rightNav.classList.remove('disabled');
		this.#contentDOM.rightNav.setAttribute('title', '');
		this.#contentDOM.rightNav.removeAttribute('disabled');

		if (data.endOfRange) {
			this.#contentDOM.rightNav.classList.add('disabled');
			this.#contentDOM.rightNav.setAttribute('disabled', 'disabled');
			this.#contentDOM.rightNav.setAttribute('title', this.#options.text.endOfRange);
		}

		this.#contentDOM.wrapper.append(this.#appendListItem(this.#contentDOM.rightNav, { 'data-pagination-item-type': 'nav' }));
	}
}
