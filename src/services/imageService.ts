import {AppDataSource} from "../dataSource";
import {Image} from "../entity/image";


class ImageService {
    private imageRepository;

    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }

    addImageToHome = async (Image) => {
        await this.imageRepository.save(Image)
    }
}

export default new ImageService()