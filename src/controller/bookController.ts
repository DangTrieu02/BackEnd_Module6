import BookService from "../services/bookService";


class BookController {
    private bookService
    constructor() {
        this.bookService = BookService
    }

    createOder(order) {
        try {
            return this.bookService.create(order)
        } catch (err) {
            console.log(1)
            console.error(err);
        }
    }
}
export default new BookController()
