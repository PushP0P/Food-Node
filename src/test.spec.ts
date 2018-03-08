let tape = require('tape');

tape.test('timing test', function (t: any) {
	t.plan(2);

	t.equal(typeof Date.now, 'function');
	let start = Date.now();

	setTimeout(function () {
		t.equal(Date.now() - start, 100);
	}, 100);

});

