const test = require('tape');
const fitTextarea = require('.');

const getField = (repeat = 50) => {
	const field = document.createElement('textarea');
	field.textContent = 'Lorem ipsum dolor sit amet'.repeat(repeat);
	document.body.append(field);
	return field;
};

const textarea = document.querySelector('textarea');
const getHeight = el => el.getBoundingClientRect().height;

test('fit content once (increase)', t => {
	t.plan(2);
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	t.true(initialHeight < getHeight(textarea));
	t.true(textarea.clientHeight >= textarea.scrollHeight);
});

test('fit content once (keep minimum height)', t => {
	t.plan(1);
	// TODO: I don't know if this is possible, but the rows attribute should be followed too
	const textarea = getField(1);
	textarea.style.minHeight = '200px';
	fitTextarea(textarea);
	t.equal(getHeight(textarea), 200);
});zA

test('fit content once + undo when empty', t => {
	t.plan(1);
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	const fitHeight = getHeight(textarea);
	textarea.value = '';
	fitTextarea(textarea);
	t.true(fitHeight > getHeight(textarea));
	// TODO: t.equal(getHeight(textarea), initialHeight);
});
