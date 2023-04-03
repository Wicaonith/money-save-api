import { UserDto } from "src/models/dto/user.dto";
import { UserDocument } from "src/models/schemas/users.schema";

export class UsersMapper {

    /**
     * Mapping de UserDocument vert UserDto
     *
     * @param {UserDocument} data
     * @return {*}  {UserDto}
     * @memberof UsersMetier
     */
    static documentToDto(data: UserDocument): UserDto {

        const { fId, username, email, createdOn } = data;

        let userDto: UserDto = {
            fId,
            username,
            email,
            createdOn,
            password: '',
            init: true
        };

        return userDto;
    }
}