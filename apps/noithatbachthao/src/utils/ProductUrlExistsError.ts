// Error types
export class ProductUrlExistsError extends Error {
	constructor(url: string) {
		super(`Sản phẩm với URL "${url}" đã tồn tại`)
		this.name = 'ProductUrlExistsError'
	}
}
