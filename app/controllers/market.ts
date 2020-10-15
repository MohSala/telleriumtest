import { success, failure } from '../lib/response_manager';
import { HTTPStatus } from '../constants/http_status';
import { upload } from "../services/imageUpload"
export class MarketController {
  logger: any;
  marketService: any;
  /**
   *
   * @param {*} logger Logger Object
   * @param {*} marketService marketService Object
   */
  constructor(logger: any, marketService: any) {
    this.logger = logger;
    this.marketService = marketService;
  }

  async addMarket(req: { body: { name: string, description: string, category: string, address: string, deliveryLng: number, deliveryLat: number }; }, res: any) {
    const {
      name, description, category, address
    } = req.body;
    if (!name || !description || !category || !address) {
      return failure(res, { message: 'Error!! pls provide missing fields' }, HTTPStatus.BAD_REQUEST);
    }
    try {
      const param = { name, description, category, address }
      const data = await this.marketService.saveMarket(param);
      if (data) {
        return success(res, {
          message: 'Market created successfully',
          response: data
        }, HTTPStatus.CREATED);
      }
      else {
        return failure(res, { message: 'Sorry this market cannot be created' }, HTTPStatus.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error('Error from creating market', error);
      return failure(res, {
        message: 'Internal server Error',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  uploadProductsImages = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return failure(res, { message: 'Please provide ID' }, HTTPStatus.BAD_REQUEST);
    }
    upload(req, res, async (error) => {
      if (error) {
        this.logger.error('Error ', error);
        return failure(res, {
          message: 'Internal server Error',
        }, HTTPStatus.INTERNAL_SERVER_ERROR);
      } else {
        // If File not found
        console.log(req.files);
        if (req.files === undefined) {
          console.log('uploadProductsImages Error: No File Selected!');
          res.status(500).json({
            status: 'fail',
            message: 'Error: No File Selected'
          });
        } else {
          try {
            // If Success
            let fileArray = req.files,
              fileLocation;
            const images = [];
            for (let i = 0; i < fileArray.length; i++) {
              fileLocation = fileArray[i].location;
              console.log('filenm', fileLocation);
              images.push(fileLocation)
            }
            // Save the file name into database
            const data = await this.marketService.uploadImage(id, images)
            return success(res, {
              message: 'Images added successfully',
              response: data
            }, HTTPStatus.CREATED);
          } catch (error) {
            this.logger.error('Error from adding images', error);
            return failure(res, {
              message: 'Internal server Error',
            }, HTTPStatus.INTERNAL_SERVER_ERROR);
          }

        }
      }
    })
  };

  async uploadImage(req: any, res: any) {
    const singleUpload = upload.single('photos');
    const { id } = req.params
    try {
      return singleUpload(req, res, async (err) => {
        if (err) {
          this.logger.info("Error Uploading image ", err)
          return failure(res, {
            message: 'Sorry user image could not be uploaded',
          }, HTTPStatus.BAD_REQUEST);
        }
        const imageUrl: String = req.file.location
        const data = await this.marketService.uploadImage(id, imageUrl)
        return success(res, {
          message: 'Image Uploaded Successfully',
          response: data
        }, HTTPStatus.OK);
      })

    } catch (error) {
      this.logger.info("Error Uploading image ", error)
      return failure(res, {
        message: 'Sorry an error occured while uploading image',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }


  }

  async getMarkets(req: any, res: any) {
    try {
      const data = await this.marketService.getMarkets();
      if (data) {
        return success(res, {
          message: 'Market retrieved successfully',
          response: data
        }, HTTPStatus.OK);
      }
    } catch (error) {
      this.logger.error('Error from fetching market', error);
      return failure(res, {
        message: 'Internal server Error',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }
}