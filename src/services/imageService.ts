import { Image } from "../entity/image";
import { AppDataSource } from "../dataSource";

class ImageService {
    private imageRepository;

  constructor() {
    this.imageRepository = AppDataSource.getRepository(Image);
  }
    async createImage(home,image){
        const newImage ={home:home,image:image}
        console.log(newImage);
        await this.imageRepository.save(newImage);
    }
}

export default new ImageService();