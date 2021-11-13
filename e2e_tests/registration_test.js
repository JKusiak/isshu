module.exports = {
	'Switch to register page': function (browser) {
		browser
			.url('http://localhost:3000/')
			.waitForElementVisible('body')
			.click('a[href="/register"]')
			.assert.urlEquals('http://localhost:3000/register')
			.end();
	},

	'Check different passwords produce error': function (browser) {
		browser
			.url('http://localhost:3000/register')
			.assert.visible('form')
			.setValue('input[name=Password]', 'John123!')
			.setValue('input[name=Confirm_password]', 'Wrong password')
			.assert.visible('p[id=error_text]')
			.assert.containsText("p[id=error_text]" ,'Passwords must be the same')
			.end();
	},

	'Create new account': function (browser) {
		browser
			.url('http://localhost:3000/register')
			.assert.visible('form')
			.setValue('input[name=Name]', 'John')
			.setValue('input[name=Surname]', 'Wayne')
			.setValue('input[name=Email]', 'john.wayne@gmail.com')
			.setValue('input[name=Password]', 'John123!')
			.setValue('input[name=Confirm_password]', 'John123!')
			.click('button[type=submit')
			.pause(1000)
			.assert.urlEquals('http://localhost:3000/login')
			.end();
	},

	'Try to add existing user': function (browser) {
		browser
			.url('http://localhost:3000/register')
			.assert.visible('form')
			.setValue('input[name=Name]', 'John')
			.setValue('input[name=Surname]', 'Wayne')
			.setValue('input[name=Email]', 'john.wayne@gmail.com')
			.setValue('input[name=Password]', 'John123!')
			.setValue('input[name=Confirm_password]', 'John123!')
			.click('button[type=submit')
			.assert.visible('p[id=error_text]')
			.assert.containsText("p[id=error_text]" ,'Email already taken')
			.end();
	},

	'Switch to login page': function (browser) {
		browser
			.url('http://localhost:3000/')
			.waitForElementVisible('body')
			.waitForElementVisible('a[href="/login"]')
			.click('a[href="/login"]')
			.assert.urlEquals('http://localhost:3000/login')
			.end();
	}
};