import { PictogramDto } from "src/models/dto/pictogram.dto";
import { PictogramParamsDto } from "src/models/dto/params/pictogram-params.dto";
import { PictogramDocument } from "src/models/schemas/pictograms.schema";

export class PictogramsMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {PictogramDocument[]} datas - Liste de document venant de la collection Pictograms
     * @return {*}  {PictogramDto[]} - Liste de DTO traduits
     * @memberof PictogramsMapper
     */
    static documentToDtoArray(datas: PictogramDocument[]): PictogramDto[] {

        let retour : PictogramDto[] = new Array();

        for(var data of datas) {
            let pictogramDto = this.documentToDto(data);
            retour.push(pictogramDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un DTO
     *
     * @static
     * @param {PictogramDocument} data - Document de la collection Pictograms
     * @return {*}  {PictogramDto} - DTO traduit
     * @memberof PictogramsMapper
     */
    static documentToDto(data: PictogramDocument): PictogramDto {
        const { _id, link, title, alt } = data;

        let pictogramDto: PictogramDto = {
            fId: _id,
            link,
            title,
            alt
        };
        return pictogramDto;
    }
}