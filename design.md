# Design Decision Notes

Formulate is a form state management library -- it's as boring as it sounds. This document goes over some of the design decisions that went into consideration when making formulate. Please leave an [issue](https://github.com/FermiDirak/Formulate/issues) if you want to leave any feedback.

## Reserved properties

A form input schema cannot have the following reserved properties:
- value
- onChange

## Error Handling

Formualate will only perform error validation after the user has blurred an input. From research, we've found this to be the ideal compromise when form errors should be reported -- if validation were to occur onChange or on form submit, the form error reporting would either feel too responsive or under-responsive.

### Custom form field validation

A prop for custom form validation was considered but was ultimately foregone since custom validation design-wise is an anti-pattern. If there is a need for custom form validation beyond whether a field is `required`, Consider updating your input field so that passing in an invalid input is impossible (ie, a Calendar Date Range should have dates out of range grayed out and unselectable).
