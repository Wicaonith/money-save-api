import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { PictogramDto } from 'src/models/dto/pictogram.dto';
import { PictogramParamsDto } from 'src/models/dto/params/pictogram-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { PictogramsMapper } from './pictograms.mapper';
import { Pictogram, PictogramDocument } from 'src/models/schemas/pictograms.schema';

@Injectable()
export class PictogramsMetier {

    /**
     * Creates an instance of PictogramsMetier.
     * @param {Model<PictogramDocument>} model - Le modèle de données
     * @memberof PictogramsMetier
     */
    constructor(@InjectModel(Pictogram.name) private readonly model: Model<PictogramDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Pictograms
     *
     * @param {PictogramParamsDto} pictogramParamsDto - Objet Params Pictogram
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof PictogramsMetier
     */
    async create(pictogramParamsDto: PictogramParamsDto): Promise<ReturnApi> {

        const newPictogram = await new this.model({ ...pictogramParamsDto, init: true }).save();
        if(newPictogram.id === undefined){
            return ErrorManagementService.failed('Pictogram creation failed.', CodeError.FC0004_D0003);
        }
        return ErrorManagementService.success('Pictogram created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Pictograms
     *
     * @param {string} id - Identifiant du document Pictograms
     * @return {*}  {Promise<PictogramDto>} - DTO Pictogram
     * @memberof PictogramsMetier
     */
    async findById(id: string): Promise<PictogramDto> {

        const pictogram = await this.model.findById(id).exec();
        if (!pictogram) {
            throw new NotFoundException(ErrorManagementService.failed('Pictogram not found.', CodeError.FC0004_D0001));
        }
        return PictogramsMapper.documentToDto(pictogram);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Pictograms
     *
     * @return {*}  {Promise<PictogramDto[]>} - Liste de DTO Pictogram
     * @memberof PictogramsMetier
     */
    async findAll(): Promise<PictogramDto[]> {

        const pictograms : PictogramDocument[] = await this.model.find().exec();
        if (pictograms.length == 0) {
            throw new NotFoundException(ErrorManagementService.failed('No pictograms found.', CodeError.FC0004_D0002));
        }

        return PictogramsMapper.documentToDtoArray(pictograms);
    }

    /**
     * Méthode de modification d'un document dans la collection Pictograms
     *
     * @param {string} id - Identifiant du document Pictograms
     * @param {PictogramParamsDto} pictogramParamsDto - Objet Params Pictogram
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof PictogramsMetier
     */
    async update(id: string, pictogramParamsDto: PictogramParamsDto) : Promise<ReturnApi> {

        const updatePictogram = await this.model.findByIdAndUpdate(id, pictogramParamsDto).exec();
        if(updatePictogram === null){
            return ErrorManagementService.failed('Pictogram not found.', CodeError.FC0004_D0001);
        }
        if(updatePictogram.id === undefined){
            return ErrorManagementService.failed('Pictogram update failed.', CodeError.FC0004_D0004);
        }
        return ErrorManagementService.success('Pictogram updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Pictograms
     *
     * @param {string} id - Identifiant du document Pictograms
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof PictogramsMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deletePictogram = await this.model.findByIdAndDelete(id).exec();
        if(deletePictogram === null){
            return ErrorManagementService.failed('Pictogram not found.', CodeError.FC0004_D0001);
        }
        if(deletePictogram.id === undefined){
            return ErrorManagementService.failed('Pictogram delete failed.', CodeError.FC0004_D0006);
        }
        return ErrorManagementService.success('Pictogram deleted.');
    }

    async addMultiple(pictogramParamsDto: PictogramParamsDto[]): Promise<ReturnApi> {
        const options = { ordered: true };
        await this.model.insertMany(pictogramParamsDto, options);
        return ErrorManagementService.success('Pictogram created.');
    }
}
