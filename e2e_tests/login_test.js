module.exports = {
	'Switch to login page': function (browser) {
		browser
			.url('http://localhost:3000/')
			.waitForElementVisible('body')
			.click('a[href="/login"]')
			.assert.urlEquals('http://localhost:3000/login')
			.end();
	},

	'Enter credentials and succesfully login': function (browser) {
		browser
			.url('http://localhost:3000/login')
			.assert.visible('form')
			.setValue('input[name=email]', 'logintest@gmail.com')
			.setValue('input[name=password]', 'Login123!')
			.click('button[type=submit')
			.assert.urlEquals('http://localhost:3000/home/projects')
			.end()
	},
}