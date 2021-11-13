const can = {
	name: 'pamplemousse',
	ounces: 12,
  };
  
describe('Just plain basic test', () => {

	it('should return 12', () => {
		expect(can.ounces).toBe(12);
	})
}) 