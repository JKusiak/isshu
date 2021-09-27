module.exports = {
	src_folders: ["e2e_tests"],

	test_workers: {
		enabled: false,
		workers: 'auto',
	},

	selenium: {
		start_process: true,
		host: '127.0.0.1',
		port: 4444,
		server_path: require('selenium-server').path,
		cli_args: {
			'webdriver.chrome.driver': require('chromedriver').path,
			'webdriver.gecko.driver': require('geckodriver').path,
		}
	},

	test_settings: {
		default: {
			launch_url: "http://localhost:3000",
			selenium_port: 4444,
			selenium_host: "localhost",
			silent: true,
			screenshots: {
				enabled: false,
				path: ""
			},
		},

		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true,
				chromeOptions: {
					w3c: true,
					args: ["headless", "no-sandbox", "disable-gpu"]
				}
			}
		},

		firefox: {
			desiredCapabilities: {
				browserName: 'firefox',
				javascriptEnabled: true,
				acceptSslCerts: true,
				'moz:firefoxOptions': {
					args: ["-headless"]
				}
			}
		},
	},
}